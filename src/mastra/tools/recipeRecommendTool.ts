import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

// .mastra/output/toolsに出力されたファイルからの相対でレシピのテキストファイルを読み込むためのパスを設定
// rootDirの取得など強引な気もするが一旦これで動かす
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = __dirname.replace(/\/?\.mastra\/output\/tools\/?$/, '')

export const recipeRecommendTool = createTool({
  id: 'Get Recipe Information',
  inputSchema: z.object({
    query: z.string(),
  }),
  description: `Fetches the Recipe information from a file`,
  execute: async () => {
    const filePath = join(rootDir, 'src/mastra/texts/recipe.txt')
    const contents = fs.readFileSync(filePath, 'utf8')

    return {
      contents: contents ? contents : 'No recipe found.',
    }
  },
})
