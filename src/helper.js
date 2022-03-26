export const getSettings = () => {
    return new Promise((resolve, reject) => {
      const settings = window.localStorage.getItem("settings");
      resolve(settings);
    });
  };
  
  export const storeSettings = (settings) => {
    window.localStorage.setItem("settings", JSON.stringify(settings));
  };
 