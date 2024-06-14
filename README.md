
# Beautiful Toast

:boom: Effortlessly create stunning and customizable toast notifications for your applications.

![ScreenRecording2024-06-14at11 34 29PM-ezgif com-video-to-gif-converter](https://github.com/naman360/beautiful-toast/assets/40193621/6897bece-3094-43de-8ccd-0fb996f148c4)


![ScreenRecording2024-06-14at11 42 34PM-ezgif com-video-to-gif-converter](https://github.com/naman360/beautiful-toast/assets/40193621/701b7dc8-c827-4b2b-8071-88c359d72636)


## Installation

```
$ npm i beautiful-toast
```

## Features
- Super easy to use! ⚡
- Multi theme support 🌈
- Progress bar for timer 🕐
- Limit on number of toasts 🔴
- Customizable toast icon ✅
- Customizable toast theme 🎉

## Usage
**Step 1: Import beautiful-toast**  

```javascript
import useToast from "beautiful-toast";
```

**Step 2: Initialize the Toast Hook**  
Use the `useToast` hook to initialize the toast component. Specify the position and the maximum number of toasts to display(**Note:** defaults to no limit). 

**Step 3: Render toast component**
```javascript
function App() {
  const { ToastComponent, showToast } = useToast("bottom-right", 5);
  return (
    <div>{ToastComponent}</div>
  )
}
```
**Step 4: Create Toasts**  
Use the `showToast` function to create and display different types of toasts. Below are examples of creating success, info, warning, error and customised toast with different themes.

*Success Toast*  
```javascript
<button
  onClick={() =>
    showToast({
      type: "success",
      message: "Result Successful",
      description: "Data from API was fetched",
      theme: "dark",
      duration: 5000,
    })
  }
>
  Show success
</button>
```

*Info Toast*  
```javascript
<button
  onClick={() =>
    showToast({
      type: "info",
      message: "This is an info toast",
      theme: "light",
      duration: 5000,
    })
  }
>
  Show info
</button>
```

*Warning Toast*  
```javascript
<button
  onClick={() =>
    showToast({
      type: "warning",
      message: "This is a warning toast",
      theme: "colored",
      duration: 5000,
    })
  }
>
  Show warning
</button>
```

*Error Toast*  
```javascript
<button
  onClick={() =>
    showToast({
      type: "error",
      message: "This is an error toast",
      theme: "dark",
      duration: 5000,
    })
  }
>
  Show error
</button>
```

*Customised Toast*
```javascript
<button
  onClick={() =>
    showToast({
      type: "success",
      message: "This is a customised toast",
      description: "Data from API is being fetched",
      theme: "custom",
      customStyles: {
        bgColor: "beige",
        timerColor: "red",
        timerHeight: "15px",
        titleColor: "blue",
        titleSize: "18px",
        descriptionColor: "blue",
        descriptionSize: "16pxpx",
        closeButtonColor: "red",
        closeButtonSize: "20px",
      },
      duration: 5000,
    })
  }
>
  Show Toast
</button>
```


## Contribute
Show your ❤️ and support by giving a ⭐. Any suggestions are welcome in the issues section.  
