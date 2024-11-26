import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveSurvey from '@salesforce/apex/SurveyController.saveSurvey';

export default class SurveyComponent extends LightningElement {
    showSurvey = true;
    satisfactionValue = '';
    improvementComment = '';
    showTextBox = false;
    isSubmitVisible = false;

    handleEmojiClick(event) {
        this.satisfactionValue = event.target.dataset.value;

        if (this.satisfactionValue === 'Bad') {
            this.showTextBox = true;
        } else {
            this.showTextBox = false;
        }

        this.isSubmitVisible = true;
    }

    
    handleMouseOver(event) {
        event.target.style.transform = 'scale(1.1)';
    }

    handleMouseOut(event) {
        event.target.style.transform = 'scale(1)';
    }

    
    handleCommentChange(event) {
        this.improvementComment = event.target.value;
    }

    
    handleSubmit() { 
       
        if (!this.satisfactionValue) {
            this.showToast('Error', 'Please select a satisfaction level before submitting.', 'error');
            return;
        }

       
        if (this.satisfactionValue === 'Bad' && !this.improvementComment) {
            this.showToast('Error', 'Please provide a feedback for improvement.', 'error');
            return;
        }

        // Create the survey record by calling Apex
        saveSurvey({
            satisfactionValue: this.satisfactionValue,
            improvementComment: this.improvementComment
        })
            .then((result) => {
                // After successful submission, show a success toast
                this.showToast('Success', 'Your feedback has been submitted!', 'success');

                this.showSurvey = false;
            })
            .catch((error) => {
                // Handle error in case the Apex call fails
                this.showToast('Error', 'There was an issue submitting your feedback. Please try again.', 'error');
                console.error(error);
            });
    }

    
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}
