<template>
    <!-- Check if the vehicle data is available -->
    <template if:true={vehicle}>
        <div class="slds-box slds-theme_default">
            <!-- Primary Vehicle Title -->
            <div class="slds-grid slds-wrap slds-p-around_small">
                <div class="slds-col slds-size_1-of-1">
                    <p class="slds-text-title">Primary Vehicle</p>
                </div>
                <div class="slds-col slds-size_1-of-1">
                    <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
                        <button class="slds-button slds-button_reset slds-type-focus">
                            <h1>{vehicle.Name}</h1>
                            <lightning-icon icon-name="utility:down" alternative-text="Down arrow" size="small"></lightning-icon>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Vehicle Image and Details Container -->
            <div class="slds-grid slds-wrap slds-p-around_small">
                <!-- Vehicle Image -->
                <div class="slds-col slds-size_1-of-3">
                    <img src={imageUrl} alt="Vehicle Image" style="width: 100%; max-width: 240px; height: auto; border-radius: 8px; border: 1px solid #ddd;">
                </div>

                <!-- Vehicle Details -->
                <div class="slds-col slds-size_2-of-3 slds-p-left_medium">
                    <div class="slds-grid slds-wrap slds-m-bottom_medium">
                        <div class="slds-col slds-size_1-of-2 slds-p-horizontal_small">
                            <p class="slds-text-title">VIN</p>
                            <p>{vehicle.VehicleIdentificationNumber}</p>
                        </div>
                        <div class="slds-col slds-size_1-of-2 slds-p-horizontal_small">
                            <p class="slds-text-title">Type of use</p>
                            <p>{vehicle.Type_of_use__c}</p>
                        </div>
                    </div>
                    <div class="slds-grid slds-wrap slds-m-bottom_medium">
                        <div class="slds-col slds-size_1-of-2 slds-p-horizontal_small">
                            <p class="slds-text-title">License</p>
                            <p>AM1234554</p>
                        </div>
                        <div class="slds-col slds-size_1-of-2 slds-p-horizontal_small">
                            <p class="slds-text-title">Purchase Date</p>
                            <p>{asset.PurchaseDate}</p>
                        </div>
                    </div>
                   <div class="slds-grid slds-wrap">
                        <div class="slds-col slds-size_1-of-2 slds-p-horizontal_small">
                            <p class="slds-text-title">Manufacture Warranty</p>
                            <p>{vehicle.Manufacturer_Warranty__c}</p>
                        </div>
                        <div class="slds-col slds-size_1-of-2 slds-p-horizontal_small">
                            <p class="slds-text-title">Connected Car</p>
                            <p>{vehicle.Connected_Car__c}</p>
                        </div> 

                    </div>
                </div>
            </div>

            <hr />

            <!-- Additional Vehicle Information -->
            <div class="slds-grid slds-wrap slds-p-around_small">
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Owner Count</p>
                    <p>{vehicle.Owner_Count__c}</p>
                </div>
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Interior Color</p>
                    <p>{vehicle.InteriorColor}</p>
                </div>
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Exterior Color</p>
                    <p>{vehicle.ExteriorColor}</p>
                </div>
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Odometer</p>
                    <p>{vehicle.LastOdometerReading}</p>
                </div>
            </div>

            <div class="slds-grid slds-wrap slds-p-around_small">
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Chassis Number</p>
                    <p>{vehicle.ChassisNumber}</p>
                </div>
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Engine Number</p>
                    <p>{vehicle.EngineNumber}</p>
                </div>
                <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                    <p class="slds-text-title">Last Check-in Date</p>
                    <p>22/2/2024</p>
                </div>
                <template if:true={supplier}>
                    <div class="slds-col slds-size_1-of-4 slds-p-horizontal_small">
                        <p class="slds-text-title">Dealership Name</p>
                        <p>{supplier.Name}</p>
                    </div>
                </template>
            </div>
        </div>
    </template>

    <!-- Error message if any error occurs -->
    <template if:true={error}>
        <p class="slds-text-color_error">Error: {error}</p>
    </template>
</template>
