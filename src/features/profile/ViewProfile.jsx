// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { AnimatePresence, motion } from "framer-motion";
// import { BASE_URL } from "../../utils/constants";

// const ViewProfile = () => {
//   const loggedInUser = useSelector((store) => store.user);
//   const { userId } = useParams();
//   const navigate = useNavigate();

//   const [profileUser, setProfileUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showPhoto, setShowPhoto] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Viewing own profile
//         if (!userId) {
//           setProfileUser(loggedInUser);
//           return;
//         }

//         // Viewing another user's profile
//         const res = await axios.get(`${BASE_URL}/user/${userId}`, {
//           withCredentials: true,
//         });

//         setProfileUser(res.data);
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             err.response?.data ||
//             "Unable to load profile",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (loggedInUser) {
//       fetchProfile();
//     }
//   }, [userId, loggedInUser]);

//   // ---------------------------------------------------------
//   // LOADING
//   // ---------------------------------------------------------

//   if (loading) {
//     return (
//       <div className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-dt-background">
//         <span className="loading loading-spinner loading-lg text-dt-primary" />
//       </div>
//     );
//   }

//   // ---------------------------------------------------------
//   // ERROR
//   // ---------------------------------------------------------

//   if (error) {
//     return (
//       <div className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-dt-background px-4">
//         <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-dt-surface p-8 text-center shadow-xl">
//           <p className="text-red-500">{error}</p>

//           <button
//             onClick={() => navigate("/feed")}
//             className="
//               mt-5
//               rounded-xl
//               bg-dt-primary
//               px-5
//               py-2
//               text-sm
//               font-semibold
//               text-white
//               transition
//               hover:bg-dt-primary-hover
//             "
//           >
//             Back to Discover
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!profileUser) return null;

//   const isOwner = !userId || loggedInUser?._id === profileUser._id;

//   const connectionStatus = profileUser?.connectionStatus;

//   const connectButtonText =
//     connectionStatus === "none" ? "Connect" : connectionStatus || "Connect";

//   const profilePhoto = profileUser.photoUrl || "/profileholder.png";

//   return (
//     <div className="min-h-[calc(100vh-74px)] bg-dt-background px-4 py-6 sm:py-8">
//       <div className="mx-auto max-w-5xl">
//         {/* =================================================
//             BACK
//         ================================================= */}

//         {userId && (
//           <Link
//             to="/feed"
//             className="
//               mb-5
//               inline-flex
//               items-center
//               gap-2
//               text-sm
//               text-dt-muted
//               transition
//               hover:text-dt-text
//             "
//           >
//             <span className="text-lg">←</span>
//             Back to Discover
//           </Link>
//         )}

//         {/* =================================================
//             PROFILE CARD
//         ================================================= */}

//         <div
//           className="
//             overflow-hidden
//             rounded-3xl
//             border
//             border-dt-border
//             bg-dt-surface
//             shadow-2xl
//           "
//         >
//           {/* Cover */}

//           <div
//             className="
//               h-28
//               bg-linear-to-r
//               from-dt-primary/40
//               via-dt-primary/20
//               to-dt-primary/5
//               sm:h-36
//             "
//           />

//           <div className="px-5 pb-7 sm:px-7">
//             {/* =================================================
//                 PROFILE HEADER
//             ================================================= */}

//             <div
//               className="
//                 -mt-14
//                 flex
//                 flex-col
//                 gap-5
//                 sm:-mt-16
//                 sm:flex-row
//                 sm:items-end
//                 sm:justify-between
//               "
//             >
//               {/* Photo + Name */}

//               <div className="flex min-w-0 items-end gap-4 sm:gap-5">
//                 <motion.img
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.97 }}
//                   src={profilePhoto}
//                   alt={`${profileUser.firstName}'s profile`}
//                   onClick={() => setShowPhoto(true)}
//                   className="
//                     h-24
//                     w-24
//                     shrink-0
//                     cursor-pointer
//                     rounded-2xl
//                     border-4
//                     border-dt-surface
//                     object-cover
//                     shadow-xl
//                     sm:h-28
//                     sm:w-28
//                   "
//                 />

//                 <div className="min-w-0 pb-1">
//                   <h1
//                     className="
//                       truncate
//                       text-xl
//                       font-bold
//                       text-dt-text
//                       sm:text-2xl
//                     "
//                   >
//                     {profileUser.firstName} {profileUser.lastName}
//                   </h1>

//                   <p className="mt-1 text-sm text-dt-muted">
//                     {profileUser.age
//                       ? `${profileUser.age} years old`
//                       : "Developer"}

//                     {profileUser.gender && ` • ${profileUser.gender}`}
//                   </p>

//                   <p className="mt-1 text-xs text-dt-primary">
//                     Click photo to view
//                   </p>
//                 </div>
//               </div>

//               {/* =================================================
//                   ACTIONS
//               ================================================= */}

//               {isOwner ? (
//                 <Link
//                   to="/profile/edit"
//                   className="
//                     w-full
//                     rounded-xl
//                     bg-dt-primary
//                     px-5
//                     py-2.5
//                     text-center
//                     text-sm
//                     font-semibold
//                     text-white
//                     transition
//                     hover:bg-dt-primary-hover
//                     sm:w-auto
//                   "
//                 >
//                   ✏️ Edit Profile
//                 </Link>
//               ) : (
//                 <div className="flex w-full gap-2 sm:w-auto">
//                   <button
//                     className="
//                       flex-1
//                       rounded-xl
//                       border
//                       border-dt-border
//                       bg-dt-surface-2
//                       px-4
//                       py-2.5
//                       text-sm
//                       font-semibold
//                       text-dt-text
//                       transition
//                       hover:border-dt-primary/40
//                       hover:bg-dt-primary/10
//                       sm:flex-none
//                       sm:px-5
//                     "
//                   >
//                     {connectButtonText}
//                   </button>

//                   <button
//                     onClick={() => navigate(`/chat/${profileUser._id}`)}
//                     className="
//                       flex-1
//                       rounded-xl
//                       bg-dt-primary
//                       px-4
//                       py-2.5
//                       text-sm
//                       font-semibold
//                       text-white
//                       transition
//                       hover:bg-dt-primary-hover
//                       sm:flex-none
//                       sm:px-5
//                     "
//                   >
//                     Message
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* =================================================
//                 ABOUT
//             ================================================= */}

//             <section className="mt-8">
//               <h2 className="text-lg font-semibold text-dt-text">About Me</h2>

//               <p className="mt-3 leading-7 text-dt-muted">
//                 {profileUser.about || "No bio added yet."}
//               </p>
//             </section>

//             {/* =================================================
//                 SKILLS
//             ================================================= */}

//             <section className="mt-8">
//               <h2 className="text-lg font-semibold text-dt-text">Skills</h2>

//               {profileUser.skills?.length > 0 ? (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {profileUser.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="
//                         rounded-full
//                         border
//                         border-dt-primary/20
//                         bg-dt-primary/10
//                         px-3
//                         py-1.5
//                         text-sm
//                         text-dt-primary
//                       "
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="mt-3 text-sm text-dt-muted">
//                   No skills added yet.
//                 </p>
//               )}
//             </section>

//             {/* =================================================
//                 DEVELOPER INFORMATION
//             ================================================= */}

//             <section
//               className="
//                 mt-8
//                 grid
//                 gap-4
//                 border-t
//                 border-dt-border
//                 pt-7
//                 sm:grid-cols-3
//               "
//             >
//               {/* Age */}

//               <div className="rounded-2xl bg-dt-surface-2 p-4">
//                 <p className="text-xs text-dt-muted">Age</p>

//                 <p className="mt-1 font-semibold text-dt-text">
//                   {profileUser.age || "Not provided"}
//                 </p>
//               </div>

//               {/* Gender */}

//               <div className="rounded-2xl bg-dt-surface-2 p-4">
//                 <p className="text-xs text-dt-muted">Gender</p>

//                 <p className="mt-1 font-semibold capitalize text-dt-text">
//                   {profileUser.gender || "Not provided"}
//                 </p>
//               </div>

//               {/* Connections */}

//               <div className="rounded-2xl bg-dt-surface-2 p-4">
//                 <p className="text-xs text-dt-muted">Connections</p>

//                 <p className="mt-1 font-semibold text-dt-text">
//                   {profileUser.userConnections ?? 0}
//                 </p>
//               </div>
//             </section>

//             {/* =================================================
//                 OWNER SECTION
//             ================================================= */}

//             {isOwner && (
//               <section
//                 className="
//                   mt-8
//                   rounded-2xl
//                   border
//                   border-dt-primary/10
//                   bg-dt-primary/5
//                   p-5
//                 "
//               >
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="font-semibold text-dt-text">
//                       Complete your profile
//                     </h3>

//                     <p className="mt-1 text-sm leading-6 text-dt-muted">
//                       Keep your developer profile updated so others can know you
//                       better.
//                     </p>
//                   </div>

//                   <Link
//                     to="/profile/edit"
//                     className="
//                       w-full
//                       rounded-xl
//                       border
//                       border-dt-primary/30
//                       px-4
//                       py-2
//                       text-center
//                       text-sm
//                       font-medium
//                       text-dt-primary
//                       transition
//                       hover:bg-dt-primary/10
//                       sm:w-auto
//                     "
//                   >
//                     Update Profile
//                   </Link>
//                 </div>
//               </section>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =================================================
//           PHOTO VIEWER
//       ================================================= */}

//       <AnimatePresence>
//         {showPhoto && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="
//               fixed
//               inset-0
//               z-9999
//               flex
//               items-center
//               justify-center
//               bg-black/85
//               p-4
//             "
//             onClick={() => setShowPhoto(false)}
//           >
//             {/* Close Button */}

//             <button
//               onClick={() => setShowPhoto(false)}
//               className="
//                 absolute
//                 right-4
//                 top-4
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-white/10
//                 text-xl
//                 text-white
//                 backdrop-blur-sm
//                 transition
//                 hover:bg-white/20
//                 sm:right-6
//                 sm:top-6
//               "
//               aria-label="Close photo"
//             >
//               ✕
//             </button>

//             {/* Photo */}

//             <motion.img
//               initial={{ scale: 0.85, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.85, opacity: 0 }}
//               transition={{
//                 duration: 0.25,
//                 ease: "easeOut",
//               }}
//               src={profilePhoto}
//               alt={`${profileUser.firstName}'s profile`}
//               onClick={(e) => e.stopPropagation()}
//               className="
//                 max-h-[85vh]
//                 max-w-[92vw]
//                 rounded-2xl
//                 object-contain
//                 shadow-2xl
//                 sm:max-h-[90vh]
//                 sm:max-w-[90vw]
//               "
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ViewProfile;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { BASE_URL } from "../../utils/constants";

const ViewProfile = () => {
  const loggedInUser = useSelector((store) => store.user);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // Viewing own profile
        if (!userId) {
          setProfileUser(loggedInUser);
          setLoading(false);
          return;
        }

        // Viewing another user's profile
        const res = await axios.get(`${BASE_URL}/user/${userId}`, {
          withCredentials: true,
        });

        setProfileUser(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data ||
            "Unable to load profile",
        );
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) {
      fetchProfile();
    }
  }, [userId, loggedInUser]);

  // ---------------------------------------------------------
  // LOADING
  // ---------------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-dt-background">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-dt-primary" />
          <p className="text-sm text-dt-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // ERROR
  // ---------------------------------------------------------

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-dt-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-red-500/20 bg-dt-surface p-8 text-center shadow-2xl"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-lg font-bold text-dt-text">
            Profile unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-dt-muted">{error}</p>

          <button
            onClick={() => navigate("/feed")}
            className="mt-6 rounded-xl bg-dt-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-dt-primary-hover hover:shadow-xl"
          >
            Back to Discover
          </button>
        </motion.div>
      </div>
    );
  }

  if (!profileUser) return null;

  const isOwner = !userId || loggedInUser?._id === profileUser._id;

  const connectionStatus = profileUser?.connectionStatus;

  const connectButtonText =
    connectionStatus === "none" ? "Connect" : connectionStatus || "Connect";

  const profilePhoto = profileUser.photoUrl || "/profileholder.png";

  const skillCount = profileUser.skills?.length || 0;

  return (
    <div className="min-h-[calc(100vh-74px)] bg-dt-background px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* =================================================
            BACK TO DISCOVER
        ================================================= */}

        {userId && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/feed"
              className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-dt-muted transition hover:bg-dt-surface-2 hover:text-dt-text"
            >
              <span className="text-lg">←</span>
              Back to Discover
            </Link>
          </motion.div>
        )}

        {/* =================================================
            MAIN PROFILE CONTAINER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[30px] border border-dt-border bg-dt-surface shadow-2xl"
        >
          {/* =================================================
              COVER / HERO
          ================================================= */}

          <div className="relative h-44 overflow-hidden sm:h-52 lg:h-60">
            {/* Main gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-dt-primary/70 via-dt-primary/30 to-dt-surface" />

            {/* Purple/red glow */}
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-dt-primary/25 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-dt-primary/20 blur-3xl" />

            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
            </div>

            {/* Developer badge */}
            <div className="absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:flex">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Developer Profile
            </div>
          </div>

          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <div className="px-5 pb-8 sm:px-8 lg:px-10">
            <div className="-mt-16 flex flex-col gap-7 sm:-mt-20 lg:flex-row lg:items-end lg:justify-between">
              {/* PHOTO + BASIC INFORMATION */}

              <div className="flex min-w-0 items-end gap-5">
                <div className="relative shrink-0">
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    src={profilePhoto}
                    alt={`${profileUser.firstName}'s profile`}
                    onClick={() => setShowPhoto(true)}
                    className="h-28 w-28 cursor-pointer rounded-3xl border-[5px] border-dt-surface object-cover shadow-2xl sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                  />

                  {/* Online indicator */}
                  <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-dt-surface bg-green-500" />
                </div>

                <div className="min-w-0 pb-2">
                  <h1 className="truncate text-2xl font-bold tracking-tight text-dt-text sm:text-3xl lg:text-4xl">
                    {profileUser.firstName} {profileUser.lastName}
                  </h1>

                  <p className="mt-2 text-sm text-dt-muted sm:text-base">
                    {profileUser.age
                      ? `${profileUser.age} years old`
                      : "Developer"}

                    {profileUser.gender && ` • ${profileUser.gender}`}
                  </p>

                  <button
                    onClick={() => setShowPhoto(true)}
                    className="mt-2 text-xs font-medium text-dt-primary transition hover:opacity-80"
                  >
                    View profile photo
                  </button>
                </div>
              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              {isOwner ? (
                <Link
                  to="/profile/edit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-dt-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-dt-primary/20 transition hover:-translate-y-0.5 hover:bg-dt-primary-hover hover:shadow-xl sm:w-auto"
                >
                  <span>✏️</span>
                  Edit Profile
                </Link>
              ) : (
                <div className="flex w-full gap-3 lg:w-auto">
                  <button className="flex-1 rounded-xl border border-dt-border bg-dt-surface-2 px-6 py-3 text-sm font-semibold text-dt-text transition hover:border-dt-primary/40 hover:bg-dt-primary/10 sm:flex-none">
                    {connectButtonText}
                  </button>

                  <button
                    onClick={() => navigate(`/chat/${profileUser._id}`)}
                    className="flex-1 rounded-xl bg-dt-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-dt-primary/20 transition hover:-translate-y-0.5 hover:bg-dt-primary-hover sm:flex-none"
                  >
                    Message
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                QUICK STATS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              {/* Connections */}

              <div className="group rounded-2xl border border-dt-border bg-dt-surface-2 p-5 transition hover:-translate-y-1 hover:border-dt-primary/30 hover:bg-dt-primary/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dt-primary/10 text-xl">
                    🤝
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-dt-muted">
                      Connections
                    </p>

                    <p className="mt-1 text-2xl font-bold text-dt-text">
                      {profileUser.userConnections ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}

              <div className="group rounded-2xl border border-dt-border bg-dt-surface-2 p-5 transition hover:-translate-y-1 hover:border-dt-primary/30 hover:bg-dt-primary/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dt-primary/10 text-xl">
                    💻
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-dt-muted">
                      Skills
                    </p>

                    <p className="mt-1 text-2xl font-bold text-dt-text">
                      {skillCount}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]">
              {/* =================================================
                  LEFT COLUMN
              ================================================= */}

              <div className="space-y-6">
                {/* ABOUT */}

                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-2xl border border-dt-border bg-dt-surface-2 p-6 sm:p-7"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-9 w-1 rounded-full bg-dt-primary" />

                    <div>
                      <h2 className="text-xl font-bold text-dt-text">
                        About Me
                      </h2>

                      <p className="mt-0.5 text-xs text-dt-muted">
                        A little about this developer
                      </p>
                    </div>
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-dt-muted sm:text-base">
                    {profileUser.about || "No bio added yet."}
                  </p>
                </motion.section>

                {/* TECH STACK */}

                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-dt-border bg-dt-surface-2 p-6 sm:p-7"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-1 rounded-full bg-dt-primary" />

                      <div>
                        <h2 className="text-xl font-bold text-dt-text">
                          Tech Stack
                        </h2>

                        <p className="mt-0.5 text-xs text-dt-muted">
                          Technologies this developer knows
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-dt-primary/10 px-3 py-1 text-xs font-semibold text-dt-primary">
                      {skillCount} skills
                    </span>
                  </div>

                  {profileUser.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {profileUser.skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.05 * index,
                          }}
                          className="rounded-xl border border-dt-primary/20 bg-dt-primary/10 px-4 py-2.5 text-sm font-medium text-dt-primary transition hover:border-dt-primary/40 hover:bg-dt-primary/15"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-dt-border p-6 text-center">
                      <p className="text-sm text-dt-muted">
                        No skills added yet.
                      </p>
                    </div>
                  )}
                </motion.section>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================= */}

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-6"
              >
                {/* DEVELOPER STATS */}

                <section className="rounded-2xl border border-dt-border bg-dt-surface-2 p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-9 w-1 rounded-full bg-dt-primary" />

                    <div>
                      <h2 className="text-xl font-bold text-dt-text">
                        Developer Stats
                      </h2>

                      <p className="mt-0.5 text-xs text-dt-muted">
                        Profile information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Connections */}

                    <div className="flex items-center justify-between rounded-xl border border-dt-border bg-dt-surface p-4 transition hover:border-dt-primary/30">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🤝</span>

                        <span className="text-sm text-dt-muted">
                          Connections
                        </span>
                      </div>

                      <span className="font-bold text-dt-text">
                        {profileUser.userConnections ?? 0}
                      </span>
                    </div>

                    {/* Skills */}

                    <div className="flex items-center justify-between rounded-xl border border-dt-border bg-dt-surface p-4 transition hover:border-dt-primary/30">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">💻</span>

                        <span className="text-sm text-dt-muted">Skills</span>
                      </div>

                      <span className="font-bold text-dt-text">
                        {skillCount}
                      </span>
                    </div>

                    {/* Age */}

                    <div className="flex items-center justify-between rounded-xl border border-dt-border bg-dt-surface p-4 transition hover:border-dt-primary/30">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎂</span>

                        <span className="text-sm text-dt-muted">Age</span>
                      </div>

                      <span className="font-bold text-dt-text">
                        {profileUser.age || "—"}
                      </span>
                    </div>

                    {/* Gender */}

                    <div className="flex items-center justify-between rounded-xl border border-dt-border bg-dt-surface p-4 transition hover:border-dt-primary/30">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👤</span>

                        <span className="text-sm text-dt-muted">Gender</span>
                      </div>

                      <span className="font-bold capitalize text-dt-text">
                        {profileUser.gender || "—"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* NETWORK CARD */}

                <section className="overflow-hidden rounded-2xl border border-dt-primary/20 bg-linear-to-br from-dt-primary/10 via-dt-primary/5 to-transparent p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-dt-primary/15 text-xl">
                      🚀
                    </div>

                    <div>
                      <h3 className="font-bold text-dt-text">
                        Build with developers
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-dt-muted">
                        Connect with developers, discover new skills and grow
                        your professional network on DevTinder.
                      </p>
                    </div>
                  </div>
                </section>
              </motion.div>
            </div>

            {/* =================================================
                OWNER PROFILE COMPLETION
            ================================================= */}

            {isOwner && (
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 overflow-hidden rounded-2xl border border-dt-primary/20 bg-linear-to-r from-dt-primary/10 via-dt-primary/5 to-transparent"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-dt-primary/15 text-xl">
                        ✨
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-dt-text">
                          Complete your developer profile
                        </h3>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-dt-muted">
                          Keep your profile updated so other developers can
                          understand your skills and connect with you.
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/profile/edit"
                      className="inline-flex shrink-0 items-center justify-center rounded-xl border border-dt-primary/30 px-6 py-3 text-sm font-semibold text-dt-primary transition hover:bg-dt-primary/10"
                    >
                      Update Profile
                    </Link>
                  </div>
                </div>
              </motion.section>
            )}
          </div>
        </motion.div>
      </div>

      {/* =================================================
          PHOTO VIEWER
      ================================================= */}

      <AnimatePresence>
        {showPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setShowPhoto(false)}
          >
            {/* Close Button */}

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowPhoto(false)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:top-6"
              aria-label="Close photo"
            >
              ✕
            </motion.button>

            {/* Photo */}

            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              src={profilePhoto}
              alt={`${profileUser.firstName}'s profile`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl sm:max-h-[90vh] sm:max-w-[90vw]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewProfile;
