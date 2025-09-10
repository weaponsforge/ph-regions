import path from 'node:path'
import { directory, copyFiles } from '@/utils/helpers.js'

const main = () => {
  const serverRootPath = path.resolve(directory(import.meta.url), '../../../')
  const outputPublic = path.join(serverRootPath, 'public')
  const outputDocs = path.join(serverRootPath, 'public/docs')

  const outDir = process.env.DEPLOYMENT_PLATFORM === 'vercel'
    ? outputPublic
    : outputDocs

  const nodeModulesPath = path.resolve(directory(import.meta.url), '../../../', 'node_modules/swagger-ui-dist')

  copyFiles(outDir, [
    path.join(nodeModulesPath, 'swagger-ui.css'),
    path.join(nodeModulesPath, 'swagger-ui-bundle.js'),
    path.join(nodeModulesPath, 'swagger-ui-standalone-preset.js'),
    path.join(nodeModulesPath, 'favicon-32x32.png')
  ])
}

main()
