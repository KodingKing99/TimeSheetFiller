
# Verisk TimeSheet Filler Chrome Extension

A chrome extension that helps fill your time sheet by splitting time into project codes and automatically filling in holiday hours.

The goal of this project was to make filling in our time sheets easier.

## Installing the extension
1. Clone the repo
4. Go to ```chrome://extensions/```
5. Toggle on developer mode ![Screenshot 2024-05-13 at 11 20 34 AM](https://github.com/KodingKing99/TimeSheetFiller/assets/89875464/53e75335-2897-46dd-a231-801366bf26fc)
6. Click Load Unpacked ![Screenshot 2024-05-13 at 11 21 49 AM](https://github.com/KodingKing99/TimeSheetFiller/assets/89875464/ee194db5-bcbc-4e52-9e08-bf9e6fc560d6)
7. Select the "TimeSheetFillerExtension/dist" folder in finder/files manager ![Screenshot 2024-05-13 ![Screenshot 2024-05-13 at 11 23 25 AM](https://github.com/KodingKing99/TimeSheetFiller/assets/89875464/019c2e87-1339-4ab5-8114-b38419054776)
8. Make sure to enable the extension by hitting the toggle ![Screenshot 2024-05-13 at 11 24 33 AM](https://github.com/KodingKing99/TimeSheetFiller/assets/89875464/93627ea2-29ad-4fb6-8040-52ee6d34065c)

## Suggestions

If you have any suggestions, please reach out on Teams! (Nick Sorenson)

## Contributing 

If you'd like to help contribute/make changes, this is the steps to build the extension.

1. cd into the root of the repo, TimeSheetFiller
2. Any changes made should be done in the ```src``` folder
3. Run ```npm i; npm run build```. This will install dependencies and compile the javascript via webpack and update the dist folder
5. Refresh the extension ![Screenshot 2024-05-14 at 11 16 04 AM](https://github.com/KodingKing99/TimeSheetFiller/assets/89875464/bcbb66af-f2b4-44cc-b565-13c2720373e3)
6. Refresh the people soft page
7. You should see your changes in the popup


