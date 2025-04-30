// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessage');
const loadPresentationBtn = document.getElementById('loadPresentation');
const savePresentationBtn = document.getElementById('savePresentation');
const fileInput = document.getElementById('fileInput');
const presentationPreview = document.getElementById('presentation-preview');

// State
let currentPresentation = null;
let conversationHistory = [
    {
        role: "system",
        content: "You are a helpful presentation editing assistant. You can help users create and edit PowerPoint presentations. You should be concise and clear in your responses. When users ask about presentation features, provide specific guidance on how to implement them."
    }
];

// Presentation State
let presentationState = {
    slides: [],
    currentSlideIndex: -1,
    awaitingInput: {
        type: null, // 'title' or 'content'
        slideIndex: null
    }
};

// Event Listeners
sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// File upload handling
loadPresentationBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

// Auto-resize textarea
messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
});

// Handle file upload
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is a PowerPoint file
    if (!file.name.match(/\.(ppt|pptx)$/i)) {
        addMessage('Please select a valid PowerPoint file (.ppt or .pptx)', 'system');
        return;
    }

    try {
        // Show loading state
        presentationPreview.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading presentation...</p>
            </div>
        `;

        // Here you would typically upload the file to your server
        // For now, we'll simulate a successful upload
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update the preview
        currentPresentation = {
            name: file.name,
            size: formatFileSize(file.size),
            lastModified: new Date(file.lastModified).toLocaleDateString()
        };

        // Initialize presentation state
        presentationState = {
            slides: [],
            currentSlideIndex: -1,
            awaitingInput: {
                type: null,
                slideIndex: null
            }
        };

        // Update the preview UI
        updatePresentationPreview();

        // Add success message to chat
        addMessage(`Successfully loaded presentation: ${file.name}`, 'system');
        
        // Add context to conversation history
        conversationHistory.push({
            role: "system",
            content: `A presentation named "${file.name}" has been loaded.`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        presentationPreview.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error loading presentation</p>
            </div>
        `;
        addMessage('Error loading presentation. Please try again.', 'system');
    }
}

// Update presentation preview
function updatePresentationPreview() {
    if (!currentPresentation) return;

    let previewHTML = `
        <div class="presentation-info">
            <i class="fas fa-file-powerpoint"></i>
            <h4>${currentPresentation.name}</h4>
            <p>Size: ${currentPresentation.size}</p>
            <p>Last Modified: ${currentPresentation.lastModified}</p>
            <div class="slides-preview">
                <h5>Slides (${presentationState.slides.length})</h5>
                <div class="slides-list">
    `;

    presentationState.slides.forEach((slide, index) => {
        previewHTML += `
            <div class="slide-item ${index === presentationState.currentSlideIndex ? 'active' : ''}">
                <span class="slide-number">${index + 1}</span>
                <span class="slide-title">${slide.title || 'Untitled'}</span>
            </div>
        `;
    });

    previewHTML += `
                </div>
            </div>
        </div>
    `;

    presentationPreview.innerHTML = previewHTML;
}

// Handle sending messages
function handleSendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Add message to conversation history
    conversationHistory.push({
        role: "user",
        content: message
    });

    // Process the message
    processMessage(message);
}

// Process the user's message
async function processMessage(message) {
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message system typing';
    typingIndicator.innerHTML = '<div class="message-content">Thinking...</div>';
    chatMessages.appendChild(typingIndicator);

    try {
        // Check if we're awaiting input for a slide
        if (presentationState.awaitingInput.type) {
            await handleSlideInput(message);
            typingIndicator.remove();
            return;
        }

        // Process the message based on its content
        const response = await handleSlideCommand(message);
        
        // Remove typing indicator
        typingIndicator.remove();

        // Add response to conversation history
        conversationHistory.push({
            role: "assistant",
            content: response
        });

        // Add response to chat
        addMessage(response, 'system');
    } catch (error) {
        typingIndicator.remove();
        addMessage('Sorry, I encountered an error. Please try again.', 'system');
        console.error('Error processing message:', error);
    }
}

// Handle slide commands
async function handleSlideCommand(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('add slide') || lowerMessage.includes('new slide')) {
        // Create a new slide
        const newSlide = {
            title: '',
            content: '',
            index: presentationState.slides.length
        };
        presentationState.slides.push(newSlide);
        presentationState.currentSlideIndex = newSlide.index;
        presentationState.awaitingInput = {
            type: 'title',
            slideIndex: newSlide.index
        };
        updatePresentationPreview();
        return "Please enter the title for the new slide:";
    }

    // Add more commands here as needed
    return "I understand you want to work on your presentation. Could you please be more specific about what you'd like to do? For example, you can ask me to add slides, edit content, change layouts, or add images.";
}

// Handle slide input (title or content)
async function handleSlideInput(message) {
    const { type, slideIndex } = presentationState.awaitingInput;
    const slide = presentationState.slides[slideIndex];

    if (type === 'title') {
        slide.title = message;
        presentationState.awaitingInput = {
            type: 'content',
            slideIndex: slideIndex
        };
        updatePresentationPreview();
        addMessage("Great! Now please enter the content for the slide:", 'system');
    } else if (type === 'content') {
        slide.content = message;
        presentationState.awaitingInput = {
            type: null,
            slideIndex: null
        };
        updatePresentationPreview();
        addMessage("Slide has been created successfully! You can now add another slide or edit this one.", 'system');
    }
}

// Add a message to the chat
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = content;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Handle saving presentation
savePresentationBtn.addEventListener('click', async () => {
    if (!currentPresentation) {
        addMessage('No presentation is currently loaded. Please load a presentation first.', 'system');
        return;
    }

    try {
        // Show saving message
        addMessage('Creating PowerPoint presentation...', 'system');

        // Create a new presentation
        let pptx = new PptxGenJS();
        
        // Set presentation properties
        pptx.author = 'Presentation Editor';
        pptx.company = 'UBS';
        pptx.title = currentPresentation.name.replace(/\.(ppt|pptx)$/i, '');

        // Add slides
        for (const slide of presentationState.slides) {
            let pptxSlide = pptx.addSlide();
            
            // Add title with updated font size
            pptxSlide.addText(slide.title, {
                x: 0.5,
                y: 0.5,
                w: '90%',
                h: 1,
                fontSize: 28,
                color: '363636',
                bold: true,
                fontFace: 'Arial',
                align: 'center'
            });

            // Add content with updated font size
            pptxSlide.addText(slide.content, {
                x: 0.5,
                y: 1.5,
                w: '90%',
                h: 4,
                fontSize: 14,
                color: '363636',
                fontFace: 'Arial',
                align: 'left',
                wrap: true
            });
        }

        // Generate the presentation
        const defaultName = currentPresentation.name.replace(/\.(ppt|pptx)$/i, '') + '_edited.pptx';
        
        // Save the presentation
        pptx.writeFile({ fileName: defaultName })
            .then(() => {
                addMessage('Presentation saved successfully as PowerPoint file!', 'system');
            })
            .catch(error => {
                console.error('Error saving presentation:', error);
                addMessage('Error saving presentation. Please try again.', 'system');
            });
    } catch (error) {
        console.error('Error creating presentation:', error);
        addMessage('Error creating presentation. Please try again.', 'system');
    }
}); 