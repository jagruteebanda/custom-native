package com.custommodule;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;

    public CustomModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void openCamera(final Callback cb) {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        JSONObject cameraData = new JSONObject();
        // TODO: hasSystemFeature check
        if (takePictureIntent.resolveActivity(reactContext.getCurrentActivity().getPackageManager()) != null) {

            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                // Error occurred while creating the File
                Log.e("react", "openCamera: " + ex.getMessage());
            }
            // Continue only if the File was successfully created
            if (photoFile != null && reactContext.hasCurrentActivity()) {
                FileProvider fileProvider = new FileProvider();
                Uri photoURI = fileProvider.getUriForFile(reactContext, reactContext.getApplicationContext().getPackageName() + ".fileprovider", photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                reactContext.getCurrentActivity().startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO);
//                reactContext.getCurrentActivity().createPendingResult();
                try {
                    cameraData.put("imageUri", photoURI);
                } catch (JSONException e) {
                    Log.e("react", "openCamera: " + e.getMessage());
                }

            }
        }
        cb.invoke(cameraData.toString());
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
        mCurrentPhotoPath = image.getAbsolutePath();
        return image;
    }

    private void galleryAddPic() {
        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        File f = new File(mCurrentPhotoPath);
        Uri contentUri = Uri.fromFile(f);
        mediaScanIntent.setData(contentUri);
        reactContext.sendBroadcast(mediaScanIntent);
    }

}
