const imageGenerationSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId
            , ref: 'User', required: true 
            
        },
        imageUrl: {
             type: String, required: true 
            
        },  //TODO : HERE ADD THE CLOUDINARY
        generatedAt: {
             type: Date, default: Date.now 
            
        },
  });
  