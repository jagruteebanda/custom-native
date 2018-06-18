package com.custommodule;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static android.app.Activity.RESULT_OK;

/**
 * Created by jagrutee on 21/05/18.
 */

public class CameraIntent {

    static ReactApplicationContext reactContext;
    String mCurrentPhotoPath;

    static final int REQUEST_TAKE_PHOTO = 1;

    public CameraIntent(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void openCamera() {
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
                try {
                    cameraData.put("imageUri", photoURI);
                } catch (JSONException e) {
                    Log.e("react", "openCamera: " + e.getMessage());
                }

            }
        }
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

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_TAKE_PHOTO && resultCode == RESULT_OK) {
            File path = new File(reactContext.getFilesDir(), "/Pictures/");
            if (!path.exists()) path.mkdirs();
            File imageFile = new File(path, "image.jpg");
            Log.d("react", "onActivityResult: "+ imageFile);
            // use imageFile to open your image
        }
    }
}
