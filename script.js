 
        // Hero Slider
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (n >= slides.length) currentSlide = 0;
            if (n < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function changeSlide(n) {
            currentSlide += n;
            showSlide(currentSlide);
        }
        
        function goToSlide(n) {
            currentSlide = n;
            showSlide(currentSlide);
        }
        
        // Auto-advance slides
        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
        
        // Mobile Menu
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Navbar scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Modal Functions
        function openBookingModal() {
            document.getElementById('bookingModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeBookingModal() {
            document.getElementById('bookingModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        function openCalculatorModal() {
            document.getElementById('calculatorModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            resetCalculator();
        }
        
        function closeCalculatorModal() {
            document.getElementById('calculatorModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Close modal on outside click
        window.onclick = function(event) {
            const bookingModal = document.getElementById('bookingModal');
            const calculatorModal = document.getElementById('calculatorModal');
            if (event.target == bookingModal) {
                closeBookingModal();
            }
            if (event.target == calculatorModal) {
                closeCalculatorModal();
            }
        }
        
        // Budget Calculator Logic
        let calculatorData = {
            projectType: '',
            bhkType: '',
            rooms: {
                living: 1,
                kitchen: 1,
                bedroom: 1,
                bathroom: 1,
                dining: 0
            },
            package: '',
            pricePerSqft: 0,
            estimatedArea: 1000
        };
        
        let currentStep = 1;
        
        function resetCalculator() {
            currentStep = 1;
            calculatorData = {
                projectType: '',
                bhkType: '',
                rooms: {
                    living: 1,
                    kitchen: 1,
                    bedroom: 1,
                    bathroom: 1,
                    dining: 0
                },
                package: '',
                pricePerSqft: 0,
                estimatedArea: 1000
            };
            updateStepIndicator();
            showStep(1);
            updateRoomCounters();
        }
        
        function showStep(step) {
            document.querySelectorAll('.calculator-step').forEach(s => s.classList.remove('active'));
            document.getElementById('step' + step).classList.add('active');
            currentStep = step;
        }
        
        function updateStepIndicator() {
            const stepDots = document.querySelectorAll('.step-dot');
            stepDots.forEach((dot, index) => {
                dot.classList.remove('active', 'completed');
                if (index + 1 < currentStep) {
                    dot.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    dot.classList.add('active');
                }
            });
        }
        
        function selectProjectType(type) {
            calculatorData.projectType = type;
            
            // Remove selected class from all cards
            document.querySelectorAll('#step1 .option-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            event.target.closest('.option-card').classList.add('selected');
            
            // Determine next step based on project type
            if (type === 'fullHome') {
                setTimeout(() => {
                    nextStep();
                }, 300);
            } else {
                // For Kitchen or Wardrobe, skip to package selection
                setTimeout(() => {
                    currentStep = 3;
                    showStep(4);
                    updateStepIndicator();
                }, 300);
            }
        }
        
        function selectBHK(type) {
            calculatorData.bhkType = type;
            
            // Estimate area based on BHK
            if (type.includes('small')) {
                calculatorData.estimatedArea = 1200;
            } else {
                calculatorData.estimatedArea = 2000;
            }
            
            // Remove selected class from all cards
            document.querySelectorAll('#step2 .option-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            event.target.closest('.option-card').classList.add('selected');
            
            setTimeout(() => {
                nextStep();
            }, 300);
        }
        
        function incrementRoom(room) {
            calculatorData.rooms[room]++;
            updateRoomCounters();
        }
        
        function decrementRoom(room) {
            if (calculatorData.rooms[room] > 0) {
                calculatorData.rooms[room]--;
                updateRoomCounters();
            }
        }
        
        function updateRoomCounters() {
            document.getElementById('livingCount').textContent = calculatorData.rooms.living;
            document.getElementById('kitchenCount').textContent = calculatorData.rooms.kitchen;
            document.getElementById('bedroomCount').textContent = calculatorData.rooms.bedroom;
            document.getElementById('bathroomCount').textContent = calculatorData.rooms.bathroom;
            document.getElementById('diningCount').textContent = calculatorData.rooms.dining;
        }
        
        function selectPackage(packageName, price) {
            calculatorData.package = packageName;
            calculatorData.pricePerSqft = price;
            
            // Remove selected class from all cards
            document.querySelectorAll('#step4 .package-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            event.target.closest('.package-card').classList.add('selected');
            
            setTimeout(() => {
                showBudgetSummary();
                nextStep();
            }, 300);
        }
        
        function showBudgetSummary() {
            const totalCost = calculatorData.estimatedArea * calculatorData.pricePerSqft;
            const gst = totalCost * 0.18;
            const finalCost = totalCost + gst;
            
            let summaryHTML = `
                <div class="summary-row">
                    <span>Project Type:</span>
                    <strong>${calculatorData.projectType === 'fullHome' ? 'Full Home Interior' : 
                            calculatorData.projectType === 'kitchen' ? 'Kitchen' : 'Wardrobe'}</strong>
                </div>
            `;
            
            if (calculatorData.bhkType) {
                summaryHTML += `
                    <div class="summary-row">
                        <span>Property Size:</span>
                        <strong>${calculatorData.bhkType.toUpperCase()} (${calculatorData.estimatedArea} sqft)</strong>
                    </div>
                `;
            }
            
            summaryHTML += `
                <div class="summary-row">
                    <span>Selected Rooms:</span>
                    <strong>${Object.values(calculatorData.rooms).reduce((a, b) => a + b, 0)} Rooms</strong>
                </div>
                <div class="summary-row">
                    <span>Package:</span>
                    <strong>${calculatorData.package.charAt(0).toUpperCase() + calculatorData.package.slice(1)}</strong>
                </div>
                <div class="summary-row">
                    <span>Rate:</span>
                    <strong>₹${calculatorData.pricePerSqft.toLocaleString('en-IN')}/sqft</strong>
                </div>
                <div class="summary-row">
                    <span>Base Cost:</span>
                    <strong>₹${totalCost.toLocaleString('en-IN')}</strong>
                </div>
                <div class="summary-row">
                    <span>GST (18%):</span>
                    <strong>₹${gst.toLocaleString('en-IN')}</strong>
                </div>
                <div class="summary-row">
                    <span>Estimated Total:</span>
                    <strong>₹${finalCost.toLocaleString('en-IN')}</strong>
                </div>
            `;
            
            document.getElementById('budgetSummary').innerHTML = summaryHTML;
        }
        
        function nextStep() {
            if (currentStep < 5) {
                currentStep++;
                showStep(currentStep);
                updateStepIndicator();
            }
        }
        
        function previousStep() {
            if (currentStep > 1) {
                // Handle special navigation for non-full-home projects
                if (calculatorData.projectType !== 'fullHome' && currentStep === 4) {
                    currentStep = 1;
                } else {
                    currentStep--;
                }
                showStep(currentStep);
                updateStepIndicator();
            }
        }
        
        // Form submission handling
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            // Formspree will handle the submission
            console.log('Form submitted');
        });
    // new for pop up message
    // Popup Functions
function openPopup() {
    document.getElementById('popupOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    document.getElementById('popupOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
document.getElementById('popupOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// WhatsApp Form Submission
function submitWhatsAppForm(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('popupName').value;
    const email = document.getElementById('popupEmail').value;
    const phone = document.getElementById('popupPhone').value;
    const location = document.getElementById('popupLocation').value;
    
    // Your WhatsApp number (replace with your actual number)
    const whatsappNumber = '916000739059'; // Format: country code + number (no + or spaces)
    
    // Create WhatsApp message
    const message = `*New Inquiry from NPAR Interiors Website*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Location:* ${location}

_Customer is interested in your interior design services._`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show success message
    document.getElementById('successMessage').classList.add('active');
    closePopup();
    
    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        document.getElementById('successMessage').classList.remove('active');
        
        // Reset form
        document.getElementById('whatsappForm').reset();
    }, 2000);
}

// Auto-show popup after 10 seconds (optional)
setTimeout(() => {
    if (!sessionStorage.getItem('popupShown')) {
        openPopup();
        sessionStorage.setItem('popupShown', 'true');
    }
}, 10000);

// Show popup on exit intent (optional)
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
        openPopup();
        sessionStorage.setItem('exitPopupShown', 'true');
    }
});
// above footer section

// Open Dream Home Form
function openDreamHomeForm() {
    document.getElementById('dreamHomeModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Dream Home Form
function closeDreamHomeForm() {
    document.getElementById('dreamHomeModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Submit Dream Home Form to WhatsApp
function submitDreamHomeForm(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    const city = document.getElementById('customerCity').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('customerMessage').value;
    
    // Your WhatsApp number (replace with your actual number)
    const whatsappNumber = '919876543210';
    
    // Create WhatsApp message
    const whatsappMessage = `*🏠 New Dream Home Inquiry - NPAR Interiors*

*Customer Details:*
👤 *Name:* ${name}
📱 *Phone:* ${phone}
📧 *Email:* ${email}
📍 *City:* ${city}
🏗️ *Project Type:* ${projectType}

*Message:*
${message || 'No additional message'}

---
_Inquiry from Dream Home CTA Section_
_Customer is ready to start their journey!_ ✨`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show success animation
    document.getElementById('dreamHomeModal').classList.remove('active');
    document.getElementById('successAnimation').classList.add('active');
    
    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        document.getElementById('successAnimation').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('dreamHomeForm').reset();
    }, 2000);
}

// Close modal on outside click
window.addEventListener('click', function(event) {
    const modal = document.getElementById('dreamHomeModal');
    if (event.target === modal) {
        closeDreamHomeForm();
    }
});
// Contact Pop Up

// Open Contact Popup
function openContactPopup() {
    document.getElementById('contactPopupOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Contact Popup
function closeContactPopup() {
    document.getElementById('contactPopupOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close on outside click
document.getElementById('contactPopupOverlay')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeContactPopup();
    }
});

// Close on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactPopup();
    }
});
// warrenty
// Show Warranty Terms
function showWarrantyTerms() {
    document.getElementById('warrantyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Warranty Terms
function closeWarrantyTerms() {
    document.getElementById('warrantyModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close on outside click
document.getElementById('warrantyModal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeWarrantyTerms();
    }
});
