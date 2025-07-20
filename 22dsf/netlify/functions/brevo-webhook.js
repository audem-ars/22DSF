exports.handler = async (event, context) => {
    // Only handle POST requests
    if (event.httpMethod !== 'POST') {
      return { 
        statusCode: 405, 
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
  
    try {
      // Parse the form submission data from Netlify
      const formData = JSON.parse(event.body);
      
      console.log('Form submission received:', formData);
  
      // Extract email and other fields
      const email = formData.email;
      const name = formData.name || '';
      const company = formData.company || '';
      const position = formData.position || '';
      const formName = formData.form_name || 'unknown';
  
      // Prepare data for Brevo
      const brevoData = {
        email: email,
        attributes: {
          FIRSTNAME: name,
          COMPANY: company,
          POSITION: position,
          FORM_SOURCE: formName
        },
        listIds: [2], // Your "Your First List" ID
        updateEnabled: true
      };
  
      // Send to Brevo API
      const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': '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'
        },
        body: JSON.stringify(brevoData)
      });
  
      const brevoResult = await brevoResponse.json();
      
      console.log('Brevo response:', brevoResult);
  
      // Return success
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: true, 
          message: 'Contact added to Brevo successfully',
          brevoResponse: brevoResult
        })
      };
  
    } catch (error) {
      console.error('Error processing webhook:', error);
      
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: false, 
          error: error.message 
        })
      };
    }
  };