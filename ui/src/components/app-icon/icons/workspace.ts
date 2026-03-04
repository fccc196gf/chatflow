import { h } from 'vue'
export default {
  'app-agent': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M10 3.5C12.4853 3.5 14.5 5.51472 14.5 8C14.5 10.4853 12.4853 12.5 10 12.5C7.51472 12.5 5.5 10.4853 5.5 8C5.5 5.51472 7.51472 3.5 10 3.5Z',
              fill: 'var(--app-text-color-secondary)',
            }),
            h('rect', {
              x: '6',
              y: '13',
              width: '8',
              height: '3.5',
              rx: '1.2',
              fill: 'var(--app-text-color-secondary)',
            }),
            h('circle', {
              cx: '8.25',
              cy: '7.5',
              r: '0.8',
              fill: 'white',
            }),
            h('circle', {
              cx: '11.75',
              cy: '7.5',
              r: '0.8',
              fill: 'white',
            }),
          ],
        ),
      ])
    },
  },
  'app-agent-robot': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 18 18',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M9 1.8V3.4',
              stroke: 'currentColor',
              'stroke-width': '1.5',
              'stroke-linecap': 'round',
            }),
            h('circle', {
              cx: '9',
              cy: '1.2',
              r: '0.9',
              fill: 'currentColor',
            }),
            h('rect', {
              x: '2.5',
              y: '3.8',
              width: '13',
              height: '10.5',
              rx: '3.2',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '1.5',
            }),
            h('circle', {
              cx: '6.8',
              cy: '8.5',
              r: '1.1',
              fill: 'currentColor',
            }),
            h('circle', {
              cx: '11.2',
              cy: '8.5',
              r: '1.1',
              fill: 'currentColor',
            }),
            h('path', {
              d: 'M6.3 11.3C7 12.1 7.9 12.5 9 12.5C10.1 12.5 11 12.1 11.7 11.3',
              stroke: 'currentColor',
              'stroke-width': '1.2',
              'stroke-linecap': 'round',
              fill: 'none',
            }),
            h('path', {
              d: 'M5.3 14.9H12.7',
              stroke: 'currentColor',
              'stroke-width': '1.5',
              'stroke-linecap': 'round',
            }),
            h('path', {
              d: 'M6.4 16.6H11.6',
              stroke: 'currentColor',
              'stroke-width': '1.5',
              'stroke-linecap': 'round',
            }),
          ],
        ),
      ])
    },
  },
  'app-agent-active': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M10 3.5C12.4853 3.5 14.5 5.51472 14.5 8C14.5 10.4853 12.4853 12.5 10 12.5C7.51472 12.5 5.5 10.4853 5.5 8C5.5 5.51472 7.51472 3.5 10 3.5Z',
              fill: 'var(--el-color-primary)',
            }),
            h('rect', {
              x: '6',
              y: '13',
              width: '8',
              height: '3.5',
              rx: '1.2',
              fill: 'var(--el-color-primary)',
            }),
            h('circle', {
              cx: '8.25',
              cy: '7.5',
              r: '0.8',
              fill: 'white',
            }),
            h('circle', {
              cx: '11.75',
              cy: '7.5',
              r: '0.8',
              fill: 'white',
            }),
          ],
        ),
      ])
    },
  },
  'app-knowledge': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M4.5 4.75H10C11.3807 4.75 12.5 5.86929 12.5 7.25V15.25H7C5.61929 15.25 4.5 14.1307 4.5 12.75V4.75Z',
              fill: 'var(--app-text-color-secondary)',
            }),
            h('path', {
              d: 'M13.5 4.75H15.5C16.6046 4.75 17.5 5.64543 17.5 6.75V13.75H13.5V4.75Z',
              fill: 'var(--app-text-color-secondary)',
            }),
            h('path', {
              d: 'M7 7.25H10V8.75H7V7.25Z',
              fill: 'white',
            }),
          ],
        ),
      ])
    },
  },
  'app-knowledge-active': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M4.5 4.75H10C11.3807 4.75 12.5 5.86929 12.5 7.25V15.25H7C5.61929 15.25 4.5 14.1307 4.5 12.75V4.75Z',
              fill: 'var(--el-color-primary)',
            }),
            h('path', {
              d: 'M13.5 4.75H15.5C16.6046 4.75 17.5 5.64543 17.5 6.75V13.75H13.5V4.75Z',
              fill: 'var(--el-color-primary)',
            }),
            h('path', {
              d: 'M7 7.25H10V8.75H7V7.25Z',
              fill: 'white',
            }),
          ],
        ),
      ])
    },
  },
  'app-tool': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('circle', {
              cx: '10',
              cy: '10',
              r: '2.75',
              fill: 'white',
              stroke: 'var(--app-text-color-secondary)',
              'stroke-width': '1.5',
            }),
            h('path', {
              d: 'M10 3.5L11.2 4.8L13 4.6L13.4 6.4L15 7.3L14.2 8.9L15 10.5L13.4 11.4L13 13.2L11.2 12.9L10 14.2L8.8 12.9L7 13.2L6.6 11.4L5 10.5L5.8 8.9L5 7.3L6.6 6.4L7 4.6L8.8 4.8L10 3.5Z',
              fill: 'none',
              stroke: 'var(--app-text-color-secondary)',
              'stroke-width': '1.5',
              'stroke-linejoin': 'round',
            }),
          ],
        ),
      ])
    },
  },
  'app-tool-active': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('circle', {
              cx: '10',
              cy: '10',
              r: '2.75',
              fill: 'white',
              stroke: 'var(--el-color-primary)',
              'stroke-width': '1.5',
            }),
            h('path', {
              d: 'M10 3.5L11.2 4.8L13 4.6L13.4 6.4L15 7.3L14.2 8.9L15 10.5L13.4 11.4L13 13.2L11.2 12.9L10 14.2L8.8 12.9L7 13.2L6.6 11.4L5 10.5L5.8 8.9L5 7.3L6.6 6.4L7 4.6L8.8 4.8L10 3.5Z',
              fill: 'none',
              stroke: 'var(--el-color-primary)',
              'stroke-width': '1.5',
              'stroke-linejoin': 'round',
            }),
          ],
        ),
      ])
    },
  },
  'app-model': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M10 3.5L15.5 6.25V11.75L10 14.5L4.5 11.75V6.25L10 3.5Z',
              fill: 'var(--app-text-color-secondary)',
            }),
            h('path', {
              d: 'M10 3.5V14.5',
              stroke: 'white',
              'stroke-width': '1.2',
            }),
            h('path', {
              d: 'M4.5 6.25L10 8.75L15.5 6.25',
              stroke: 'white',
              'stroke-width': '1.2',
            }),
          ],
        ),
      ])
    },
  },
  'app-model-active': {
    iconReader: () => {
      return h('i', [
        h(
          'svg',
          {
            viewBox: '0 0 20 20',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
              d: 'M10 3.5L15.5 6.25V11.75L10 14.5L4.5 11.75V6.25L10 3.5Z',
              fill: 'var(--el-color-primary)',
            }),
            h('path', {
              d: 'M10 3.5V14.5',
              stroke: 'white',
              'stroke-width': '1.2',
            }),
            h('path', {
              d: 'M4.5 6.25L10 8.75L15.5 6.25',
              stroke: 'white',
              'stroke-width': '1.2',
            }),
          ],
        ),
      ])
    },
  },
}
