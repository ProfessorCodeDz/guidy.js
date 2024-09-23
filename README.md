# Guidy.js

**Guidy.js** is a lightweight JavaScript library that allows you to create step-by-step user guides and onboarding experiences on web pages. It provides an easy way to highlight elements, show tooltips, and guide users through different steps of your web application.

## Features
- **Step-by-step guidance**: Guide users through a series of steps.
- **Highlight elements**: Focus on specific elements during each step.
- **Positioning**: Display guidance elements on the top, right, bottom, or left of the target element.
- **Customizable content**: Add text, images, and videos to each step.
- **Progress display**: Show current progress in multi-step guides.
- **Loop steps**: Allow the guide to restart from the first step after the last step is completed.
- **Close and navigate steps**: Add next, previous, and close buttons to navigate the guide.
- **Scroll to elements**: Automatically scroll to elements during the guide.
  
## Installation

You can include **Guidy.js** in your project via npm:

```bash
npm install guidy
```

Or use it directly via a CDN:

```html
<script src="https://unpkg.com/guidy@latest/guidy.js"></script>
```
```html
<script src="https://cdn.jsdelivr.net/npm/guidy@latest/guidy.js"></script>
```

## Usage

### Basic Setup

1. Import or include `guidy.js` in your project.
2. Create a new instance of `Guidy` and pass the steps as an array of objects.

Each step should contain:
- `selector`: The CSS selector of the target element.
- `title`: The title of the guide step.
- `description`: The description of the guide step.
- `position`: The position of the guide tooltip relative to the element (`top`, `right`, `bottom`, `left`).
- `image`: (Optional) Image URL to display in the guide step.
- `video`: (Optional) Video URL to display in the guide step.
- `scroll`: (Optional) Whether to scroll to the element.

```javascript
import Guidy from 'guidy';

const steps = [
    {
        selector: "#element1",
        title: "Step 1",
        description: "This is the first step",
        position: "top",
        image: "image1.jpg",
        scroll: true
    },
    {
        selector: "#element2",
        title: "Step 2",
        description: "This is the second step",
        position: "right",
        video: "video1.mp4",
    }
];

const guidy = new Guidy({
    steps: steps,
    loop: true, // Optional: Loop steps when completed
    progress: true // Optional: Show progress of steps
});

// Start the guide
guidy.play();
```

### Methods

#### `play()`
Starts the guide from the first step.

```javascript
guidy.play();
```

#### `playStep(stepNum)`
Plays a specific step by its step number (`stepNum`). This method allows you to jump to any step in the guide.

```javascript
// Jump to step 2 (index 1)
guidy.playStep(1);
```

- **Parameters**:
  - `stepNum`: (number) The step index to play.
  
- **Usage**:
  You can use `playStep()` to start at any specific step, navigate to a certain step programmatically, or handle custom user actions that move them to a specific guide step.

- **Example**:

```javascript
// Example to skip to the second step directly
guidy.playStep(1);
```

#### `close()`
Closes the guide.

```javascript
guidy.close();
```

### Step Object Properties

- **selector**: (string) CSS selector of the element to highlight.
- **title**: (string) Title of the step.
- **description**: (string) Description of the step.
- **position**: (string) Position of the tooltip (`top`, `right`, `bottom`, `left`).
- **image**: (optional, string) URL of an image to display.
- **video**: (optional, string) URL of a video to display.
- **scroll**: (optional, boolean) Scroll the page to the selected element.

### Options in Constructor

- **steps**: (array) Array of step objects.
- **loop**: (boolean) If `true`, the guide will loop back to the first step when completed.
- **progress**: (boolean) If `true`, shows the current step number and total steps.

### Example

```javascript
const steps = [
    {
        selector: "#header",
        title: "Welcome!",
        description: "This is the header section of the page.",
        position: "bottom",
        scroll: true
    },
    {
        selector: "#content",
        title: "Content Section",
        description: "This is the main content section.",
        position: "right"
    },
    {
        selector: "#footer",
        title: "Footer",
        description: "This is the footer of the page.",
        position: "top"
    }
];

const guidy = new Guidy({
    steps: steps,
    loop: false,
    progress: true
});

guidy.play();
```

### Styling

You can customize the appearance of the guide by modifying the CSS styles applied in the script or by applying your own styles via external CSS.

### Default Style (CSS)

```css
#guidy_el {
    position: absolute;
    padding: 5px;
    color: black;
    z-index: 9999;
}

.guidy_el_container {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
    padding: 15px;
    width: 300px;
    border-radius: 5px;
    background: white;
}

.guidy_el_btns button {
    background: black;
    color: white;
    width: 80px;
    height: 30px;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

#guidy_el #close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
}
```

## License

Guidy.js is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Feel free to contribute, open issues, or suggest improvements!
