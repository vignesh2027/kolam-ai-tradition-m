// Kolam AI Mentor - GitHub Spark API
// Intelligent responses about kolam culture, patterns, and techniques

export default async function handler(req, res) {
  // Enable CORS for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, language = 'en' } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userMessage = message.toLowerCase().trim();
    let reply = "";

    // Cultural knowledge responses
    if (userMessage.includes('kolam') || userMessage.includes('pattern')) {
      const kolamResponses = [
        "Kolams are sacred geometric patterns drawn with rice flour to welcome prosperity and positive energy into homes.",
        "Traditional kolams follow mathematical principles of symmetry, representing the cosmic order and harmony.",
        "Each kolam design tells a story - from simple dots to complex mandalas that celebrate festivals and seasons."
      ];
      reply = kolamResponses[Math.floor(Math.random() * kolamResponses.length)];
    }
    
    // Symmetry and technique guidance
    else if (userMessage.includes('symmetry') || userMessage.includes('radial') || userMessage.includes('axis')) {
      const symmetryResponses = [
        "Start with 8-way radial symmetry for balanced mandalas. Each stroke mirrors across 8 axes, creating perfect harmony.",
        "Radial symmetry patterns (4, 6, 8, 12, 16 axes) represent cosmic cycles and spiritual completeness in kolam tradition.",
        "Try combining horizontal and vertical symmetry first, then explore diagonal and radial modes for complex designs."
      ];
      reply = symmetryResponses[Math.floor(Math.random() * symmetryResponses.length)];
    }
    
    // Drawing tips and techniques
    else if (userMessage.includes('draw') || userMessage.includes('create') || userMessage.includes('tips')) {
      const drawingTips = [
        "Begin with a central dot and expand outward. This represents the cosmic center from which all creation emerges.",
        "Use flowing, continuous lines when possible. Unbroken patterns symbolize life's eternal flow.",
        "Layer different symmetry modes to create complex designs - start simple, then add radial patterns on top."
      ];
      reply = drawingTips[Math.floor(Math.random() * drawingTips.length)];
    }
    
    // Cultural significance
    else if (userMessage.includes('culture') || userMessage.includes('meaning') || userMessage.includes('tradition')) {
      const culturalResponses = [
        "In Tamil culture, kolams are drawn daily at dawn to purify the space and invite divine blessings.",
        "Kolams represent impermanence - they're beautiful, temporary art that teaches us to let go and recreate.",
        "Festival kolams use colored powders and flowers, transforming simple patterns into vibrant celebrations of life."
      ];
      reply = culturalResponses[Math.floor(Math.random() * culturalResponses.length)];
    }
    
    // Festival and celebration guidance
    else if (userMessage.includes('festival') || userMessage.includes('diwali') || userMessage.includes('pongal')) {
      reply = "Festival kolams are grand and colorful! Use vibrant powders, flower petals, and complex radial patterns. Try 12-way or 16-way symmetry for elaborate designs.";
    }
    
    // Template suggestions
    else if (userMessage.includes('template') || userMessage.includes('design') || userMessage.includes('idea')) {
      const templateSuggestions = [
        "Try the lotus template - it uses 8-way radial symmetry and represents purity and spiritual awakening.",
        "The peacock pattern combines flowing curves with radial symmetry, symbolizing beauty and grace.",
        "Mandala templates with 12-way symmetry create stunning cosmic wheel patterns perfect for meditation."
      ];
      reply = templateSuggestions[Math.floor(Math.random() * templateSuggestions.length)];
    }
    
    // Greeting responses
    else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('namaste')) {
      reply = "Namaste! 🙏 I'm your Kolam Mentor, here to guide you through the sacred art of pattern creation. What would you like to learn about kolams today?";
    }
    
    // Farewell responses
    else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('thank')) {
      reply = "May your kolam creations bring beauty and blessings! Keep exploring the sacred geometry of tradition. Vanakkam! 🌸";
    }
    
    // Help and guidance
    else if (userMessage.includes('help') || userMessage.includes('stuck') || userMessage.includes('how')) {
      reply = "I'm here to help! Ask me about kolam patterns, symmetry techniques, cultural meanings, or drawing tips. What specific guidance do you need?";
    }
    
    // Default response for unmatched queries
    else {
      const defaultResponses = [
        "That's an interesting question about kolams! Let me share some wisdom - kolam patterns reflect the interconnectedness of all things.",
        "In the spirit of kolam tradition, every question leads to deeper understanding. What aspect of kolam art interests you most?",
        "The beauty of kolams lies in their infinite possibilities. Feel free to ask about patterns, culture, or drawing techniques!"
      ];
      reply = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Add language-specific responses (basic multilingual support)
    if (language === 'ta' && userMessage.includes('kolam')) {
      reply = "கோலம் ஒரு புனித கலை. இது சமத்துவம் மற்றும் அழகை குறிக்கிறது.";
    } else if (language === 'hi' && userMessage.includes('kolam')) {
      reply = "कोलम एक पवित्र कला है जो सुंदरता और संतुलन का प्रतीक है।";
    } else if (language === 'fr' && userMessage.includes('kolam')) {
      reply = "Les kolams sont des motifs sacrés qui symbolisent l'harmonie et la beauté spirituelle.";
    }

    // Return the response in the expected format
    return res.status(200).json({
      success: true,
      message: reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Mentor API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'I apologize, but I encountered an issue. Please try asking your question again.'
    });
  }
}