package com.inspectour.app;

import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = getBridge().getWebView();
        webView.addJavascriptInterface(new PrintBridge(webView), "AndroidPrint");
    }

    /** Expose window.AndroidPrint.print() : ouvre le dialogue d'impression Android (enregistrer en PDF possible). */
    private class PrintBridge {
        private final WebView webView;

        PrintBridge(WebView webView) {
            this.webView = webView;
        }

        @JavascriptInterface
        public void print() {
            runOnUiThread(() -> {
                PrintManager pm = (PrintManager) getSystemService(PRINT_SERVICE);
                String jobName = "Rapport_InspecTour";
                PrintAttributes attrs = new PrintAttributes.Builder()
                        .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                        .build();
                pm.print(jobName, webView.createPrintDocumentAdapter(jobName), attrs);
            });
        }
    }
}
