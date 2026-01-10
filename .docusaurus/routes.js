import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '600'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '3f5'),
        routes: [
          {
            path: '/docs/tags',
            component: ComponentCreator('/docs/tags', 'fce'),
            exact: true
          },
          {
            path: '/docs/tags/docusaurus',
            component: ComponentCreator('/docs/tags/docusaurus', '817'),
            exact: true
          },
          {
            path: '/docs/tags/facebook',
            component: ComponentCreator('/docs/tags/facebook', '925'),
            exact: true
          },
          {
            path: '/docs/tags/hello',
            component: ComponentCreator('/docs/tags/hello', 'c8e'),
            exact: true
          },
          {
            path: '/docs/tags/hola',
            component: ComponentCreator('/docs/tags/hola', '3c3'),
            exact: true
          },
          {
            path: '/docs',
            component: ComponentCreator('/docs', '49f'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '10c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '698'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'ee3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/blog/2021-08-26-welcome/welcome',
                component: ComponentCreator('/docs/blog/2021-08-26-welcome/welcome', '48f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/blog/first-blog-post',
                component: ComponentCreator('/docs/blog/first-blog-post', 'f02'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/blog/long-blog-post',
                component: ComponentCreator('/docs/blog/long-blog-post', '581'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/blog/mdx-blog-post',
                component: ComponentCreator('/docs/blog/mdx-blog-post', 'e75'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-1-ros-2-fundamentals',
                component: ComponentCreator('/docs/category/module-1-ros-2-fundamentals', '91b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-1-ros-2-fundamentals-1',
                component: ComponentCreator('/docs/category/module-1-ros-2-fundamentals-1', '7c0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-2-gazebo--unity',
                component: ComponentCreator('/docs/category/module-2-gazebo--unity', 'c6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-2-gazebo--unity-1',
                component: ComponentCreator('/docs/category/module-2-gazebo--unity-1', 'c36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-3-nvidia-isaac',
                component: ComponentCreator('/docs/category/module-3-nvidia-isaac', '05c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-3-nvidia-isaac-1',
                component: ComponentCreator('/docs/category/module-3-nvidia-isaac-1', '947'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-4-vision-language-action',
                component: ComponentCreator('/docs/category/module-4-vision-language-action', 'a2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-4-vision-language-action-1',
                component: ComponentCreator('/docs/category/module-4-vision-language-action-1', '323'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/command',
                component: ComponentCreator('/docs/command', 'bc5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/hardware-requirements',
                component: ComponentCreator('/docs/docs/hardware-requirements', '4a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module1/week1-intro-physical-ai',
                component: ComponentCreator('/docs/docs/module1/week1-intro-physical-ai', '222'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module1/week2-intro-physical-ai-2',
                component: ComponentCreator('/docs/docs/module1/week2-intro-physical-ai-2', '068'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module1/week3-ros-fundamentals',
                component: ComponentCreator('/docs/docs/module1/week3-ros-fundamentals', '6a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module1/week4-ros-fundamentals-2',
                component: ComponentCreator('/docs/docs/module1/week4-ros-fundamentals-2', 'a6f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module1/week5-ros-fundamentals-3',
                component: ComponentCreator('/docs/docs/module1/week5-ros-fundamentals-3', 'c59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module2/week6-gazebo',
                component: ComponentCreator('/docs/docs/module2/week6-gazebo', '5b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module2/week7-gazebo-unity',
                component: ComponentCreator('/docs/docs/module2/week7-gazebo-unity', '91f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module3/week10-isaac-3',
                component: ComponentCreator('/docs/docs/module3/week10-isaac-3', 'aa4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module3/week8-isaac',
                component: ComponentCreator('/docs/docs/module3/week8-isaac', '791'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module3/week9-isaac-2',
                component: ComponentCreator('/docs/docs/module3/week9-isaac-2', '8f1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module4/week11-humanoid-dev',
                component: ComponentCreator('/docs/docs/module4/week11-humanoid-dev', '5d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module4/week12-humanoid-dev-2',
                component: ComponentCreator('/docs/docs/module4/week12-humanoid-dev-2', '397'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docs/module4/week13-conversational-robotics',
                component: ComponentCreator('/docs/docs/module4/week13-conversational-robotics', 'b4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware-requirements',
                component: ComponentCreator('/docs/hardware-requirements', '663'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week1-intro-physical-ai',
                component: ComponentCreator('/docs/module1/week1-intro-physical-ai', '6d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week2-intro-physical-ai-2',
                component: ComponentCreator('/docs/module1/week2-intro-physical-ai-2', 'e71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week3-ros-fundamentals',
                component: ComponentCreator('/docs/module1/week3-ros-fundamentals', '501'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week4-ros-fundamentals-2',
                component: ComponentCreator('/docs/module1/week4-ros-fundamentals-2', '0be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week5-ros-fundamentals-3',
                component: ComponentCreator('/docs/module1/week5-ros-fundamentals-3', '008'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module2/week6-gazebo',
                component: ComponentCreator('/docs/module2/week6-gazebo', '7d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module2/week7-gazebo-unity',
                component: ComponentCreator('/docs/module2/week7-gazebo-unity', 'b30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module3/week10-isaac-3',
                component: ComponentCreator('/docs/module3/week10-isaac-3', '24b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module3/week8-isaac',
                component: ComponentCreator('/docs/module3/week8-isaac', '93a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module3/week9-isaac-2',
                component: ComponentCreator('/docs/module3/week9-isaac-2', '86f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module4/week11-humanoid-dev',
                component: ComponentCreator('/docs/module4/week11-humanoid-dev', '180'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module4/week12-humanoid-dev-2',
                component: ComponentCreator('/docs/module4/week12-humanoid-dev-2', '472'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module4/week13-conversational-robotics',
                component: ComponentCreator('/docs/module4/week13-conversational-robotics', 'f64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/src/pages/markdown-page',
                component: ComponentCreator('/docs/src/pages/markdown-page', '311'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
