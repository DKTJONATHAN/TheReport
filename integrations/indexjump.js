// integrations/indexjump.js
export default function indexJumpIntegration() {
  return {
    name: 'indexjump-auto-submit',
    hooks: {
      'astro:build:done': async ({ pages, routes }) => {
        const SITE_URL = process.env.SITE_URL || 'https://jonathanmwaniki.co.ke';
        
        console.log('🔍 Triggering post indexing...');
        
        try {
          const response = await fetch(`${SITE_URL}/api/index-posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ IndexJump integration completed:', result.message);
            if (result.submitted > 0) {
              console.log(`📤 Successfully indexed ${result.successful} posts`);
            }
          } else {
            console.log('⚠️  IndexJump API call failed:', response.status);
          }
          
        } catch (error) {
          console.log('⚠️  Could not call IndexJump API:', error.message);
        }
      }
    }
  };
}