export const debounce = (callback: any, delay = 500) => {
  let debounceTimer: NodeJS.Timeout | null = null;
  return (...args: any) => {
    // Clear the previous timeout if it exists
    if (debounceTimer) clearTimeout(debounceTimer);
    // Set a new timeout to avoid multiple calls
    debounceTimer = setTimeout(() => callback(...args), delay);
  };
};

export const throttle = (callback: any, time = 200) => {
  let throttlePause = false;
  return (...args: any) => {
    //don't run the function if throttlePause is true
    if (throttlePause) return;

    //set throttlePause to true after the if condition. This allows the function to be run once
    throttlePause = true;
    setTimeout(() => {
      callback(...args);
      // set throttlePause to false to allow the function to be run again
      throttlePause = false;
    }, time);
  };
};
