import model from './gemini';

export async function generateChatResponse(userInput: string) {
  try {
    // Start a chat session
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
      history: [
        {
          role: "user",
          parts: [{text: "You are an AI assistant for the Imaginify project. You should help users understand the project's features, technologies, and implementation details."}],
        },
        {
          role: "model",
          parts: [{text: "I understand that I'm an AI assistant for the Imaginify project, which is an AI-powered image transformation platform. I can help users understand the project's features, technologies, and implementation details. The project uses technologies like Next.js, Cloudinary for image processing, MongoDB for data storage, and various AI models for different image transformations. I'll provide accurate information based on the project's actual implementation."}],
        },
        {
          role: "user",
          parts: [{text: "The project includes features like image restoration, background removal, generative fill, object removal, and object recoloring. Users can transform their images using these AI-powered features. The project uses Clerk for authentication, Stripe for payments, and Cloudinary for image transformations."}],
        },
        {
          role: "model",
          parts: [{text: "I understand the project's core features and technology stack. I'll help users with any questions about these features, the implementation details, or the technologies used."}],
        },
        {
          role: "user",
          parts: [{text: "For image transformations, we use specific Cloudinary AI models: 'removeBackground' for background removal, 'restore' for image restoration, 'recolor' for object recoloring, 'remove' for object removal, and 'fill' for generative fill. These transformations are implemented in lib/actions/image.actions.ts. The API routes in app/api/webhooks handle Stripe and Cloudinary webhooks. The database schemas in lib/database/models handle User, Image, and Transaction collections."}],
        },
        {
          role: "model",
          parts: [{text: "I understand the specific implementation details of each image transformation and the complete codebase structure. I can explain how each Cloudinary AI model is used, how the transformations are implemented in the actions, how the API routes work, and how the database schemas are structured. I'll provide accurate technical details based on the actual code implementation."}],
        },
        {
          role: "user",
          parts: [{text: "Here's how our image transformations work in the code: In lib/actions/image.actions.ts, we use Cloudinary's API for transformations. For background removal, we use the removeBackground config defined in constants/index.ts: { type: 'removeBackground', config: { removeBackground: true } }. The transformation process happens in the TransformationForm component where we use: const transformationConfig = transformationTypes[type].config; const imageData = await cloudinary.uploader.upload(file, { transformation: [transformationConfig] }); Then we store the result in our Image model with fields like transformationType, publicId, secureURL, width, height, and config. The TransformedImage component displays the result using CldImage with these stored parameters."}],
        },
        {
          role: "model",
          parts: [{text: "I understand the background removal implementation in our code. When users ask about it, I can explain that we use Cloudinary's removeBackground AI model through their API. The process is: 1) User selects background removal transformation, 2) We use the config { removeBackground: true } from constants/index.ts, 3) The image is uploaded to Cloudinary with this transformation config, 4) Cloudinary's AI processes the image to remove the background, 5) We store the result in our database, and 6) Display it using CldImage component. I can provide the exact code snippets from our implementation when needed."}],
        }
      ]
    });

    // Send message and get response
    const result = await chat.sendMessage(userInput);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
} 




//which model did we use in our project for background remove of an image
//explain the transformation of an image with code that we used