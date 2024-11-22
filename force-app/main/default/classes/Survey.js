import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveSurvey from '@salesforce/apex/SurveyController.saveSurvey';

export default class SurveyComponent extends LightningElement {
    @track showSurvey = true;

    handleEmojiClick(event) {
        const selectedValue = event.currentTarget.dataset.value; // Access data-value properly
        console.log('Selected Value:', selectedValue);

        // Call Apex method to save the survey
        saveSurvey({ satisfactionValue: selectedValue })
            .then((recordId) => {
                console.log('Record Created with ID:', recordId);

                // Show success message
                this.showToast('Success', `Your feedback "${selectedValue}" has been saved. Thank you!`, 'success');

                // Hide survey and show thank-you message
                this.showSurvey = false;
            })
            .catch((error) => {
                console.error('Error saving survey:', error);

                // Show error message
                this.showToast('Error', 'An error occurred while saving your feedback. Please try again.', 'error');
            });
    }

    handleMouseOver(event) {
        event.currentTarget.style.transform = 'scale(1.2)'; // Increase size on hover
    }

    handleMouseOut(event) {
        event.currentTarget.style.transform = 'scale(1)'; // Reset size on hover out
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}
