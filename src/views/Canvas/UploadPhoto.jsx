import React from "react";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function UploadPhoto({ onDrop }) {
  return (
    <>
      <Grid item xs>
        <div>
          <ImageUploader
            withIcon={true}
            label={"Accepted formats: jpg, png. Max size 10mb."}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".png", ".jpeg"]}
            singleImage
            withPreview
            maxFileSize={10485760}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={"h6"} gutterBottom>
          Give your best shot
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" gutterBottom>
          Disclamer: Photo will be published on a public decentralized database
          such as ipfs Please don't provide sensitive data. <br /> By submiting
          your image you agree to make it public. The NFT will be minted to your
          address. You have total copyright over it to do whatever you please.
        </Typography>
      </Grid>
    </>
  );
}

export default UploadPhoto;
