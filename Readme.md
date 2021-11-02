# Image Processing API

This application reads and writes resized image to disk via a Node.js express server.

## Provided endpoint
`/api/images`

### Query string parameters

| Query string param | Type | Description |
|-------------|---------------|---------------|
| filename    | `string` | Image from `images/full` folder (required)   |
| width    | `string` | Image width (optional)          |
| height | `string` | Image height (optional) 

### Usage example
`http://localhost:3091/api/images?filename=palmtunnel&width=500&height=500`

## Getting started
```
npm install
npm run start
```

### Build & Run
```
npm run build
npm run start-dist
```

### Linter/prettier
```
npm run lint
npm run prettier
```

### Tests
```
npm run test
```
