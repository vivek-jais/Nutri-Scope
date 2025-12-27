"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function AIPage() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages,setMessages]=useState([])

  // ✅ MAIN FORM SUBMIT
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ text, imageUrl });
    toast.success("Query submitted");
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      setOpen(false);
      const res = await axios.post("/api/upload-cloudinary", formData);
      setImageUrl(res.data.imageUrl);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-[30%] border-r p-4 flex flex-col gap-4">
        {
          imageUrl && <img src={imageUrl}></img>
        }
        <h2 className="text-lg font-semibold">AI Agent</h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 h-full">
          <Textarea
            placeholder="Ask the AI something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 resize-none"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" disabled={loading}>
                {
                  loading ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : "Upload Image"
                }
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
              </DialogHeader>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </DialogContent>
          </Dialog>

          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </aside>
    </div>
  );
}
