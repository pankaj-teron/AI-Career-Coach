"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveCoverLetter } from "@/actions/cover-letter";
import { Loader2, Save } from "lucide-react";

const CoverLetterPreview = ({ content, id }) => {
  const [previewContent, setPreviewContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCoverLetter(id, previewContent);
      toast.success("Cover letter saved successfully!");
    } catch (error) {
      toast.error("Failed to save cover letter");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="md:flex-row justify-between items-center gap-2">
        <div className="flex justify-end">
          <div className="space-x-2">
            <Button
              variant="destructive"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="py-4">
          <MDEditor
            value={previewContent}
            onChange={setPreviewContent}
            height={700}
            preview="edit"
          />
        </div>
        <div className="hidden">
          <div id="cover">
            <MDEditor.Markdown
              source={previewContent}
              style={{
                background: "white",
                color: "black",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
