import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const PublicProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/profile/${username}`);
        setProfile(res.data.profile);
        setLinks(res.data.links);
      } catch (error) {
        if (error.response?.status === 404) {
          navigate("/404", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-bg text-text">
        Loading profile...
      </div>
    );
  }

  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const avatarSrc = profile.avatarUrl
    ? `${avatarBaseUrl}${profile.avatarUrl}`
    : `https://ui-avatars.com/api/?name=${profile.username}`;

  return (
    <div className="min-h-screen flex justify-center pt-14 bg-bg">
      <div className="w-full max-w-xl px-4 pb-16">
        <div className="flex flex-col items-center mb-12">
          <img
            src={avatarSrc}
            alt={`${profile.username}'s avatar`}
            className="object-cover w-28 h-28 rounded-full shadow-lg"
          />

          <h1 className="mt-5 text-3xl font-semibold text-text tracking-wide">
            @{profile.username}
          </h1>

          <p className="mt-4 max-w-sm text-center text-text-muted leading-relaxed text-[17px] px-4">
            {profile.bio}
          </p>

          <div className="mt-6 w-24 h-0.5 bg-accent/40 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block w-full text-center font-medium
                  py-4 rounded-full
                  bg-card text-text
                  border border-border-soft
                  transition-all duration-300
                  hover:border-primary
                  hover:bg-bg-soft
                "
              >
                {link.title}
              </a>
            ))
          ) : (
            <p className="text-center text-text-muted">
              This user hasn't added any links yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
