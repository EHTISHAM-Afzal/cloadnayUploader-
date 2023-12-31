import "./App.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  // 1. third party script load
  useEffect(() => {
    // check to see if this script is already loaded and that we are in an
    // environment that recognizes the window object
    const cldScript = document.getElementById("cloudinaryUploadWidgetScript");
    // if window is defined and script is not loaded and not in window add script
    if (typeof window !== "undefined" && !loaded && !cldScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "cloudinaryUploadWidgetScript");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    }
  }, [loaded]);

  // 2. process results
  // the Upload Widget will send back status that could be used in a progress bar
  // we'll wait for success and the render the image to the page
  const processResults = (error, result) => {
    if (error) {
      console.log("error", error);
    }
    if (result && result.event === "success") {
      console.log(result);
      console.log("success", result.info.secure_url);
      setUploadedImage(result.info.secure_url);
    }
  };

  // 3. open the widget
  // minmal upload widget configuration to allow for local and url uploads
  // a rendered button onclick event calls this function to open the widget
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "sham007",
        uploadPreset: "littlelemon",
        sources: ["local", "url"],
        folder: "FromMobile",
      },
      processResults,
    );
  };

  // code includes a form to enter Cloud Name and Unsigned Preset
  // this allows for users to upload to their own Cloudinary project environment
  return (
    <div>
      <h3
        className={
          "font-medium leading-tight text-4xl mt-0 mb-2 text-white-600"
        }
      >
        Upload Widget
      </h3>

      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-cldblue-500 hover:bg-cldblue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={uploadWidget}
            >
              Upload File
            </button>
            {uploadedImage && (
              <img
                style={{ width: "100%", padding: "10px" }}
                src={uploadedImage}
                alt="uploaded using the upload widget"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
