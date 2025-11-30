import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiSend, FiX, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { AuthContext } from '@site/src/components/AuthContext';
import styles from './ChatPanel.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  redirect?: string; // Optional redirect URL
  redirectStatus?: 'pending' | 'navigating' | 'done'; // Redirect status for UI
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText?: string;
}

type PanelSize = 'small' | 'medium' | 'large';

// Hardcoded for now - in production, use environment variables via docusaurus.config.js customFields
const API_URL = 'https://ai-rative-book-backend-production.up.railway.app';
const API_KEY = 'fwnelrjrl2ur08d9s0fsdhf90324h30493';

// Regex to detect redirect commands in response
const REDIRECT_REGEX = /\[\[REDIRECT:([^\]]+)\]\]/;

// Session storage key for chat messages
const CHAT_MESSAGES_KEY = 'physical-ai-chat-messages';

export default function ChatPanel({ isOpen, onClose, selectedText }: ChatPanelProps): JSX.Element {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [panelSize, setPanelSize] = useState<PanelSize>('medium');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const routerHistory = useHistory();
  
  // Get base URL for proper routing
  const baseUrl = useBaseUrl('/');

  // Load messages from session storage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedMessages = sessionStorage.getItem(CHAT_MESSAGES_KEY);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects and clear redirect status
        const restored = parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
          redirectStatus: m.redirectStatus === 'navigating' ? 'done' : m.redirectStatus,
        }));
        setMessages(restored);
      }
    } catch (e) {
      console.error('Failed to restore chat messages:', e);
    }
  }, []);

  // Save messages to session storage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat messages:', e);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Prepare chat history for API
    const chatHistory = messages.map(m => ({
      user_message: m.role === 'user' ? m.content : '',
      ai_response: m.role === 'assistant' ? m.content : '',
    })).filter(h => h.user_message || h.ai_response);

    try {
      // Build headers with user context for personalization
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      };
      
      // Add user ID if authenticated for personalized responses
      if (isAuthenticated && user?.id) {
        headers['X-User-ID'] = user.id;
      }
      
      // Add current page context so the bot knows where the user is
      if (typeof window !== 'undefined') {
        headers['X-Current-Page'] = window.location.href;
      }

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: input,
          history: chatHistory,
          selected_text: selectedText || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle SSE streaming
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          // Parse SSE data
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data && data !== '[DONE]') {
                assistantContent += data;
                
                // Check for redirect command
                const redirectMatch = assistantContent.match(REDIRECT_REGEX);
                let displayContent = assistantContent;
                let redirectUrl: string | undefined;
                
                if (redirectMatch) {
                  redirectUrl = redirectMatch[1];
                  // Remove the redirect command from displayed content
                  displayContent = assistantContent.replace(REDIRECT_REGEX, '').trim();
                }
                
                setMessages(prev => 
                  prev.map(m => 
                    m.id === assistantMessage.id 
                      ? { ...m, content: displayContent, redirect: redirectUrl, redirectStatus: redirectUrl ? 'pending' : undefined }
                      : m
                  )
                );
              }
            }
          }
        }
        
        // After streaming is complete, check if we need to redirect
        const finalRedirectMatch = assistantContent.match(REDIRECT_REGEX);
        if (finalRedirectMatch) {
          const redirectUrl = finalRedirectMatch[1];
          
          // Update status to navigating
          setMessages(prev => 
            prev.map(m => 
              m.id === assistantMessage.id 
                ? { ...m, redirectStatus: 'navigating' }
                : m
            )
          );
          
          // Delay redirect so user can see the message, then navigate
          setTimeout(() => {
            // Update status to done before navigating
            setMessages(prev => 
              prev.map(m => 
                m.id === assistantMessage.id 
                  ? { ...m, redirectStatus: 'done' }
                  : m
              )
            );
            
            // Use Docusaurus router for navigation with proper baseUrl
            // Construct the full URL with baseUrl prefix
            const fullUrl = baseUrl.endsWith('/') 
              ? baseUrl.slice(0, -1) + redirectUrl 
              : baseUrl + redirectUrl;
            routerHistory.push(fullUrl);
          }, 2000);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    // Also clear from session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(CHAT_MESSAGES_KEY);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.chatPanel} ${styles[panelSize]}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <FiMessageSquare />
          <span>AI Assistant</span>
        </div>
        <div className={styles.headerControls}>
          <button 
            onClick={() => setPanelSize('small')} 
            className={`${styles.sizeButton} ${panelSize === 'small' ? styles.active : ''}`}
            title="Small view"
          >
            S
          </button>
          <button 
            onClick={() => setPanelSize('medium')} 
            className={`${styles.sizeButton} ${panelSize === 'medium' ? styles.active : ''}`}
            title="Medium view"
          >
            M
          </button>
          <button 
            onClick={() => setPanelSize('large')} 
            className={`${styles.sizeButton} ${panelSize === 'large' ? styles.active : ''}`}
            title="Large view"
          >
            L
          </button>
          <button 
            onClick={clearChat} 
            className={styles.clearButton} 
            aria-label="Clear chat"
            title="Clear chat history"
            disabled={messages.length === 0}
          >
            <FiTrash2 size={14} />
          </button>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close chat">
            <FiX />
          </button>
        </div>
      </div>

      {selectedText && (
        <div className={styles.selectedTextBanner}>
          <strong>Context:</strong> {selectedText.slice(0, 100)}...
        </div>
      )}

      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.welcomeMessage}>
            <h3>Welcome to the Physical AI Assistant!</h3>
            <p>Ask me anything about ROS 2, Gazebo, NVIDIA Isaac, or humanoid robotics.</p>
            <div style={{ fontSize: '0.85rem', marginTop: '12px', color: 'var(--ifm-color-emphasis-600)' }}>
              <p style={{ marginBottom: '6px' }}><strong>💡 Tips:</strong></p>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Ask for "detailed" or "in-depth" explanations for comprehensive answers</li>
                <li>Select text on the page for context-aware help</li>
                <li><strong>🔗 Navigation:</strong> Ask me to redirect you to specific modules (e.g., "take me to module 2")</li>
              </ul>
            </div>
          </div>
        )}
        
        {messages.map(message => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.role]} ${message.redirect ? styles.redirectMessage : ''}`}
          >
            <div className={styles.messageContent}>
              {message.role === 'assistant' ? (
                <>
                  <ReactMarkdown>
                    {message.content || (isLoading ? 'Thinking...' : '')}
                  </ReactMarkdown>
                  {message.redirect && (
                    <div className={`${styles.redirectIndicator} ${message.redirectStatus === 'navigating' ? styles.navigating : ''}`}>
                      {message.redirectStatus === 'navigating' ? (
                        <>
                          <span className={styles.redirectSpinner}>⏳</span>
                          <span>Taking you there now...</span>
                        </>
                      ) : message.redirectStatus === 'done' ? (
                        <>
                          <span className={styles.redirectIcon}>✅</span>
                          <span>Redirected!</span>
                        </>
                      ) : (
                        <>
                          <span className={styles.redirectIcon}>🔗</span>
                          <span>Will redirect to: {message.redirect}</span>
                        </>
                      )}
                    </div>
                  )}
                </>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        
        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Physical AI..."
          className={styles.input}
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className={styles.sendButton}
          aria-label="Send message"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}
