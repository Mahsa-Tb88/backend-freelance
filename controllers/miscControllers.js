export async function uploadFile(req, res) {
  const filename = req.file.filename;
  console.log("uploadfile")

  const body = {
    filename: filename,
    url: "/uploads/" + req.folder + "/" + filename,
  };
  res.success("The file was uploaded successfully!", body);
}
