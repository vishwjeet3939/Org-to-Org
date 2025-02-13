import { LightningElement } from 'lwc';
import carImages from '@salesforce/resourceUrl/carImages'; // Import static resource

export default class CarouselComponent extends LightningElement {
    images = [
        {
            src: `${carImages}/image1.jpg`, // Reference image from ZIP
            title: 'Car 1',
            description: 'Experience unmatched luxury and speed.',
        },
        {
            src: `${carImages}/image2.jpg`, // Reference image from ZIP
            title: 'Car 2',
            description: 'Performance and elegance combined.',
        },
    ];
}
