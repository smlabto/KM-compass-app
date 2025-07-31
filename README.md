<div align="center">
  <a href="https://km.socialmedialab.ca/"><img src="https://github.com/smlabto/KM-compass-app/blob/main/public/img/km_compass_logo.png" height="140px" /></a>
  <h1>Social Media Lab's <a href="https://km.socialmedialab.ca/">KM Compass</a></h1>
  <h3>Helping You Share What You Know, Where It Matters Most.<br>Pour vous aider à partager ce que vous savez, là où c’est le plus important.</h3>
</div>

<br>

## About | À propos

This app is designed to help researchers like you turn ideas into impact.
Whether you’re just getting started or looking to improve your Knowledge Mobilization (KM) efforts,
KM Compass will guide you through the process every step of the way.

Cette application est conçue pour aider les chercheurs comme vous à transformer leurs idées en impact.
Que vous commenciez à peine ou que vous cherchiez à améliorer vos efforts de mobilisation des connaissances (KM),
KM Compass vous guidera à chaque étape du processus.

## Setup Instructions

1. Run ```npm i``` to install dependencies
2. Start a development server with ```npm run dev```
3. Create a build using ```npx next build``` and start it with ```npx next start``` 


## Technical Explanation
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#) 
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)


The app's data is separated into three components: `Stakeholders`, `Strategies`, and `Examples`.

These components are defined in JSON files located in `/public/json/`:
- `data.json` - contains the `Stakeholders` and `Strategies`
- `examples.json` - contains the `Examples`  
> Each of these also has a `_fr.json` counterpart for French language content. When a user switches languages, the app reloads and loads the corresponding file automatically.

Every component has 4 fields common among them all 
- `name` - acts as a unique 'id', is used by other components when it wants to be referenced.
- `label` - acts as the name visible to the user on the application.
- `summary` - self explanatory, on the app it is shown after the `label` to the user.
- `type` - defines what type of component it is, for Stakeholders use `stakeholder`, for Strategies use `strategy`, for Examples use `example`

> For Strategies, they also have a sub-type field called 'strategy_type', this field can either be `dissemination` or `engagement` and based on which field it is given, it will be place into that list on the frontend.

### Connecting Components:

The application allows users to select a Stakeholder, which then allows them to see Strategies ideal for that stakeholder. Then, they can select a Strategy, and see Examples of that Strategy. So components are connected in this order: `Stakeholder` -> `Strategy` -> `Example`

In order to connect a **Stakeholder** to a specific **Strategy**, you must add the ```name``` of a **Strategy** to the ```strategy_names``` field inside of a **Stakeholder**. To connect a **Strategy** to an **Example**, use the same logic by adding the **Example** ```name``` to the ```example_names``` list of a **Strategy**

### Example-Specific Fields:

All **Examples** are stored inside of ```example.json``` and differ slightly as they have more fields than the Stakeholder and Strategy components.

The 3 fields: ```exampleTitle```, ```exampleLink```, ```exampleText``` define parts of the "real world example" that appears at the bottom of the page for a chosen Example.

The fields: ```keyStrengths```, ```keyConsiderations``` define what goes inside of the bullet point list of the two sections "Key Strengths" and "Key Consideration" of an example. These fields store strings, and to define when a new bullet point starts, use the vertical line character: ```|``` to say when a new bullet point begins.

### Images for Example Components:

**Examples** also have an associated image, you can see two examples in this repo under ```/public/img/``` as ```example_1.png``` and ```example_2.png```. The image is dynamically loaded by looking at what the ```name``` of the image is inside of the json file, and then it looks for a ```.png``` image that uses the same name. So when adding a new image for an example, make sure you name the png the exact same name give to the example.