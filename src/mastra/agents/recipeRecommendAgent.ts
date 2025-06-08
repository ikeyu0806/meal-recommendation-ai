import { openai } from '@ai-sdk/openai'
import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'
import { recipeRecommendTool } from '../tools/recipeRecommendTool'

export const recipeAgent = new Agent({
  name: 'Recipe Agent',
  instructions: `
      You are a helpful Recipe assistant that provides accurate answers based on a provided Recipe file.

      - Use the "Recipe From File" tool to fetch answers from the Recipe file.
      - Always ask for clarification if the user's question is vague or not directly answerable from the Recipe.
      - Keep responses concise but informative, summarizing the key points from the Recipe entries.

      
`,
  model: openai('gpt-4o-mini'),

  tools: { recipeRecommendTool },

  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
})
