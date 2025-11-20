import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuthStore from "../store/authStore";
import Modal from "./Modal";
import { bioSchema } from "../utils/validationSchemas";
import { FaPen } from "react-icons/fa";

const ProfileHeader = () => {
  const { user, updateBio, updateAvatar } = useAuthStore();

  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) updateAvatar(file);
  };

  const handleAvatarEditClick = () => {
    fileInputRef.current.click();
  };

  const handleBioSubmit = async (values, { setSubmitting }) => {
    await updateBio(values.bio);
    setSubmitting(false);
    setIsBioModalOpen(false);
  };

  return (
    <div className="p-6 mb-8 rounded-xl bg-card border border-border-soft shadow-md">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div
          className="relative w-24 h-24 group cursor-pointer"
          onClick={handleAvatarEditClick}
        >
          <img
            src={
              user.avatarUrl
                ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
                : `https://ui-avatars.com/api/?name=${user.username}`
            }
            alt="Profile Avatar"
            className="object-cover w-24 h-24 rounded-full"
          />

          <div
            className="
            absolute inset-0 rounded-full bg-black/40
            opacity-0 flex items-center justify-center
            group-hover:opacity-100 transition
          "
          >
            <FaPen className="text-white text-sm" />
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif"
        />

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-text tracking-wide">
            @{user.username}
          </h2>

          <p className="mt-1 text-text-muted leading-relaxed">
            {user.bio || "You haven't set a bio yet."}
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsBioModalOpen(true)}
            className="
              px-4 py-2 rounded-full font-medium
              text-text-muted bg-bg-soft
              hover:bg-bg-muted hover:text-primary
              transition cursor-pointer
            "
          >
            Edit Bio
          </button>
        </div>
      </div>

      <Modal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        title="Edit Bio"
      >
        <Formik
          initialValues={{ bio: user.bio || "" }}
          validationSchema={bioSchema}
          onSubmit={handleBioSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <div className="relative">
                <Field
                  as="textarea"
                  name="bio"
                  rows="4"
                  className="
                    w-full px-3 py-2 rounded-md
                    bg-bg text-text
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                  placeholder="Tell others about yourself..."
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="absolute -bottom-5 left-0 text-destructive text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBioModalOpen(false)}
                  className="
                    px-4 py-2 rounded-full
                    text-text-muted bg-bg-soft
                    hover:bg-bg-muted transition cursor-pointer
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    px-5 py-2 rounded-full font-medium tracking-wide
                    bg-primary text-text
                    hover:bg-primary-hover
                    transition cursor-pointer disabled:opacity-50
                  "
                >
                  {isSubmitting ? "Saving..." : "Save Bio"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ProfileHeader;
