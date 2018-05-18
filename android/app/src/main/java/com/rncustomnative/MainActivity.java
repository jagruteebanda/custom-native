package com.rncustomnative;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;

import com.facebook.react.ReactActivity;

import java.io.File;

public class MainActivity extends ReactActivity {

    static final int REQUEST_IMAGE_CAPTURE = 1;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNCustomNative";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d("react", "onActivityResult: " + requestCode);
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
//            Bundle extras = data.getExtras();
//            Bitmap imageBitmap = (Bitmap) extras.get("data");
//            Log.d("react", "onActivityResult: " + imageBitmap);
            File path = new File(getFilesDir(), "/Pictures/");
            if (!path.exists()) path.mkdirs();
            File imageFile = new File(path, "image.jpg");
            Log.d("react", "onActivityResult: "+ imageFile);
                // use imageFile to open your image
        }
    }
}
