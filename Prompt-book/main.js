import './style.css'

const prompts = {
    writing: [
      "Write a detailed story outline for a [genre] novel about [subject], including key plot points and character arcs.",
      "Create a compelling blog post about [topic] that incorporates current trends and research.",
      "Develop a unique writing style guide for [specific audience] that focuses on [aspect of writing]."
    ],
    coding: [
      "Create a step-by-step tutorial for building a [type] application using [technology/framework].",
      "Explain the concept of [programming concept] with practical examples and best practices.",
      "Design a system architecture for a [type of application] that focuses on scalability and performance."
    ],
    business: [
      "Develop a comprehensive marketing strategy for a [type of business] targeting [specific audience].",
      "Create a business plan template for a [industry] startup with detailed financial projections.",
      "Write a pitch deck outline for a [type of product/service] that will appeal to investors."
    ],
    creative: [
      "Generate unique ideas for a [medium] artwork that explores the theme of [concept].",
      "Design a character profile for a [genre] story, including personality traits and backstory.",
      "Create a mood board description for a [type of project] with specific color schemes and elements."
    ],
    academic: [
      "Write a research proposal outline for studying the effects of [variable] on [subject].",
      "Create a lesson plan template for teaching [subject] to [grade level] students.",
      "Develop a literature review structure for a paper about [academic topic]."
    ]
  };
  
  const categoryButtons = document.querySelectorAll('.category-btn');
  const promptText = document.querySelector('.prompt-text');
  const copyBtn = document.querySelector('.copy-btn');
  const copiedMessage = document.querySelector('.copied-message');
  
  let currentPrompts = [];
  let currentIndex = 0;
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      currentPrompts = prompts[category];
      currentIndex = 0;
      updatePrompt();
    });
  });
  
  function updatePrompt() {
    promptText.textContent = currentPrompts[currentIndex];
    currentIndex = (currentIndex + 1) % currentPrompts.length;
  }
  
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(promptText.textContent).then(() => {
      copiedMessage.classList.add('show');
      setTimeout(() => {
        copiedMessage.classList.remove('show');
      }, 2000);
    });
  });
  
  setInterval(() => {
    if (currentPrompts.length > 0) {
      updatePrompt();
    }
  }, 10000);


  