import { LightningElement } from 'lwc';
import saveSurvey from '@salesforce/apex/SurveyController.saveSurvey';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Survey extends LightningElement {
    handleEmojiClick(event) {
        const satisfactionValue = event.currentTarget.dataset.value;

        // Call Apex to save the record
        saveSurvey({ satisfactionValue })
            .then(() => {
                this.showToast('Success', 'Thank you for your feedback!', 'success');
            })
            .catch((error) => {
                console.error('Error saving survey:', error);
                this.showToast('Error', 'Failed to save the survey', 'error');
            });
    }

    handleMouseOver(event) {
        event.currentTarget.style.transform = 'scale(1.2)'; // Enlarge the emoji
    }

    handleMouseOut(event) {
        event.currentTarget.style.transform = 'scale(1)'; // Reset the emoji size
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({ title, message, variant });
        this.dispatchEvent(toastEvent);
    }
}
