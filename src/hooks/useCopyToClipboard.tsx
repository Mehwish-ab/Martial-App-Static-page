import { toast } from "react-toastify";
import { live_base_url } from "../utils/api_urls";

const useCopyToClipboard = () => {
  const clipboardCopyHandler = (link: string) => {
    navigator.clipboard.writeText(live_base_url + link);
    toast("Copied to Clipboard");
  };

  return clipboardCopyHandler;
};

export default useCopyToClipboard;
