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
        // Ensure `data-value` is retrieved correctly
        const button = event.currentTarget;
        this.satisfactionValue = button.dataset.value;

        if (this.satisfactionValue === 'Bad') {
            this.showTextBox = true;
        } else {
            this.showTextBox = false;
        }

        this.isSubmitVisible = true;
    }

    handleMouseOver(event) {
        event.currentTarget.style.transform = 'scale(1.1)';
    }

    handleMouseOut(event) {
        event.currentTarget.style.transform = 'scale(1)';
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

        saveSurvey({
            satisfactionValue: this.satisfactionValue,
            improvementComment: this.improvementComment
        })
            .then(() => {
                this.showToast('Success', 'Your feedback has been submitted!', 'success');
                this.showSurvey = false;
            })
            .catch((error) => {
                this.showToast('Error', 'There was an issue submitting your feedback. Please try again.', 'error');
                console.error(error);
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}
