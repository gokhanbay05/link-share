import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useLinkStore from "../store/linkStore";
import { linkSchema } from "../utils/validationSchemas";
import Modal from "../components/Modal";
import ProfileHeader from "../components/ProfileHeader";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableLinkItem from "../components/SortableLinkItem";

const DashboardPage = () => {
  const {
    links,
    isLoading,
    fetchLinks,
    addLink,
    deleteLink,
    updateLink,
    reorderLinks,
  } = useLinkStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const openEditModal = (link) => {
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedLink(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link._id === active.id);
      const newIndex = links.findIndex((link) => link._id === over.id);
      const newOrderedLinks = arrayMove(links, oldIndex, newIndex);
      reorderLinks(newOrderedLinks);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 px-4 pb-20">
      <ProfileHeader />

      <div className="p-6 mb-8 rounded-xl bg-card border border-border-soft shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-text tracking-wide">
          Add New Link
        </h2>

        <Formik
          initialValues={{ title: "", url: "" }}
          validationSchema={linkSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await addLink(values.title, values.url);
              resetForm();
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative">
                <Field
                  type="text"
                  name="title"
                  placeholder="Link Title (e.g., GitHub)"
                  className="
                    w-full px-3 py-2 rounded-md
                    bg-bg text-text
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="absolute -bottom-5 left-0 text-destructive text-sm"
                />
              </div>

              <div className="flex-1 relative">
                <Field
                  type="url"
                  name="url"
                  placeholder="URL (e.g., https://github.com)"
                  className="
                    w-full px-3 py-2 rounded-md
                    bg-bg text-text
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                />
                <ErrorMessage
                  name="url"
                  component="div"
                  className="absolute -bottom-5 left-0 text-destructive text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  px-6 py-2 rounded-full font-medium tracking-wide
                  bg-primary text-text
                  transition-all duration-300
                  hover:bg-primary-hover
                  hover:shadow-[inset_0_0_8px_var(--color-primary-muted)]
                  cursor-pointer
                  disabled:opacity-50
                "
              >
                {isSubmitting ? "Adding..." : "Add Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text tracking-wide">
          Your Links
        </h2>

        {isLoading && <p className="text-text-muted">Loading links...</p>}

        {!isLoading && links.length === 0 && (
          <p className="p-4 rounded-lg bg-card border border-border-soft text-text-muted">
            You don't have any links yet. Add one above!
          </p>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((link) => link._id)}
            strategy={verticalListSortingStrategy}
          >
            {!isLoading &&
              links.map((link) => (
                <SortableLinkItem
                  key={link._id}
                  link={link}
                  onEdit={openEditModal}
                  onDelete={deleteLink}
                />
              ))}
          </SortableContext>
        </DndContext>
      </div>

      {selectedLink && (
        <Modal isOpen={isModalOpen} onClose={closeEditModal} title="Edit Link">
          <Formik
            initialValues={{
              title: selectedLink.title,
              url: selectedLink.url,
            }}
            validationSchema={linkSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await updateLink(selectedLink._id, values.title, values.url);
                closeEditModal();
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="edit-title"
                    className="block mb-1 text-sm font-medium text-text-muted"
                  >
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    id="edit-title"
                    className="
                      w-full px-3 py-2 rounded-md
                      bg-bg text-text
                      border border-border
                      focus:outline-none focus:ring-2 focus:ring-primary
                    "
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="absolute -bottom-5 left-0 text-destructive text-sm"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="edit-url"
                    className="block mb-1 text-sm font-medium text-text-muted"
                  >
                    URL
                  </label>
                  <Field
                    type="url"
                    name="url"
                    id="edit-url"
                    className="
                      w-full px-3 py-2 rounded-md
                      bg-bg text-text
                      border border-border
                      focus:outline-none focus:ring-2 focus:ring-primary
                    "
                  />
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="absolute -bottom-5 left-0 text-destructive text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={closeEditModal}
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
                      transition-all duration-300
                      hover:bg-primary-hover
                      hover:shadow-[inset_0_0_8px_var(--color-primary-muted)]
                      cursor-pointer
                      disabled:opacity-50
                    "
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
