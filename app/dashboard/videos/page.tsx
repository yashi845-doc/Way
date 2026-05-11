"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bell,
  Search,
  Grid2X2,
  List,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  Filter,
  X,
  Play,
} from "lucide-react";



type VideoStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Video {
  id: number;
  title: string;
  uploader: string;
  uploaderAvatar: string;
  date: string;
  status: VideoStatus;
  tags: string[];
  likes: number;
  comments: number;
  thumbnail: string;
  duration: string;
  views: number;
}

interface FilterState {
  status: string;
  tags: string[];
  uploader: string;
  date: string;
}



const mockVideos: Video[] = [
  {
    id: 1,
    title: "hi",
    uploader: "@minhaj khan",
    uploaderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=MK&backgroundColor=7441d8",
    date: "5/6/2026",
    status: "PENDING",
    tags: ["ACTING", "ENGLISH"],
    likes: 0,
    comments: 0,
    thumbnail: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=220&fit=crop",
    duration: "2:34",
    views: 120,
  },
  {
    id: 2,
    title: "dua",
    uploader: "@minhaj khan",
    uploaderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=MK&backgroundColor=7441d8",
    date: "5/6/2026",
    status: "PENDING",
    tags: ["FASHION", "TELUGU"],
    likes: 0,
    comments: 0,
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=220&fit=crop",
    duration: "1:15",
    views: 85,
  },
  {
    id: 3,
    title: "dua",
    uploader: "@minhaj khan",
    uploaderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=MK&backgroundColor=7441d8",
    date: "5/6/2026",
    status: "PENDING",
    tags: ["FASHION", "TELUGU"],
    likes: 0,
    comments: 0,
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=220&fit=crop",
    duration: "3:45",
    views: 200,
  },
  {
    id: 4,
    title: "nznsnjs",
    uploader: "@hzbsb",
    uploaderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=HZ&backgroundColor=e64f82",
    date: "5/6/2026",
    status: "PENDING",
    tags: ["ACTING", "ENGLISH"],
    likes: 0,
    comments: 0,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop",
    duration: "0:58",
    views: 34,
  },
  {
    id: 5,
    title: "test video",
    uploader: "@john doe",
    uploaderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=3e82ff",
    date: "5/6/2026",
    status: "APPROVED",
    tags: ["ACTING"],
    likes: 12,
    comments: 3,
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop",
    duration: "5:20",
    views: 980,
  },
  {
    id: 6,
    title: "sample clip",
    uploader: "@jane",
    uploaderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=JN&backgroundColor=5abc68",
    date: "5/5/2026",
    status: "REJECTED",
    tags: ["FASHION"],
    likes: 0,
    comments: 0,
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=220&fit=crop",
    duration: "1:02",
    views: 10,
  },
];

const ALL_TAGS = ["ACTING", "ENGLISH", "FASHION", "TELUGU"];

// ─── Tailwind Class Maps ──────────────────────────────────────────────────────

const TAG_CLASS: Record<string, string> = {
  ACTING: "bg-blue-600 text-white",
  ENGLISH: "bg-purple-600 text-white",
  FASHION: "bg-pink-600 text-white",
  TELUGU: "bg-violet-600 text-white",
};

const STATUS_TEXT_CLASS: Record<VideoStatus, string> = {
  PENDING: "text-yellow-400",
  APPROVED: "text-green-400",
  REJECTED: "text-red-400",
};

const STATUS_BG_CLASS: Record<VideoStatus, string> = {
  PENDING: "bg-yellow-400",
  APPROVED: "bg-green-400",
  REJECTED: "bg-red-400",
};

// ─── StatusIcon ───────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: VideoStatus }) {
  if (status === "PENDING") return <Clock className="w-3.5 h-3.5" />;
  if (status === "APPROVED") return <CheckCircle className="w-3.5 h-3.5" />;
  return <XCircle className="w-3.5 h-3.5" />;
}

// ─── TagBadge ─────────────────────────────────────────────────────────────────

function TagBadge({ tag, small = false }: { tag: string; small?: boolean }) {
  const cls = TAG_CLASS[tag] ?? "bg-gray-600 text-white";
  return (
    <span className={`${cls} font-bold uppercase tracking-wider rounded ${small ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5"}`}>
      {tag}
    </span>
  );
}

// ─── ApproveRejectButtons ─────────────────────────────────────────────────────

function ApproveRejectButtons({
  id,
  onApprove,
  onReject,
}: {
  id: number;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onApprove(id)}
        className="w-7 h-7 rounded-full border border-green-500 flex items-center justify-center hover:bg-green-900 transition-colors"
      >
        <CheckCircle className="w-4 h-4 text-green-500" />
      </button>
      <button
        onClick={() => onReject(id)}
        className="w-7 h-7 rounded-full border border-red-500 flex items-center justify-center hover:bg-red-900 transition-colors"
      >
        <XCircle className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}

// ─── VideoCard (Grid View) ────────────────────────────────────────────────────

function VideoCard({
  video,
  onApprove,
  onReject,
}: {
  video: Video;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col hover:border-gray-600 transition-all duration-200 group">

      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-800">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />

        {/* Tags over thumbnail */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {video.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
        </div>

        {/* Status dot */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-950 bg-opacity-80 px-2 py-0.5 rounded-full">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_BG_CLASS[video.status]}`} />
          <span className={`text-xs font-bold ${STATUS_TEXT_CLASS[video.status]}`}>{video.status}</span>
        </div>

        {/* Duration + Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-950 bg-opacity-40">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-2 border-white border-opacity-60">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-gray-950 bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">

        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{video.title}</h3>

        {/* Uploader */}
        <div className="flex items-center gap-2">
          <Image
            src={video.uploaderAvatar}
            alt={video.uploader}
            width={22}
            height={22}
            className="rounded-full"
            unoptimized
          />
          <span className="text-gray-400 text-xs">{video.uploader}</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>

        {/* Date + Views */}
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {video.date}
          </span>
          <span>{video.views.toLocaleString()} views</span>
        </div>

        {/* Divider + Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{video.likes}</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{video.comments}</span>
          </div>
          <ApproveRejectButtons id={video.id} onApprove={onApprove} onReject={onReject} />
        </div>

      </div>
    </div>
  );
}

// ─── VideoRow (List View) ─────────────────────────────────────────────────────

function VideoRow({
  video,
  onApprove,
  onReject,
}: {
  video: Video;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl flex items-center gap-4 p-3 hover:border-gray-600 transition-all duration-200">

      {/* Thumbnail */}
      <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 group">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        <span className="absolute bottom-1 right-1 bg-gray-950 bg-opacity-80 text-white text-xs px-1 py-0.5 rounded font-medium">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {video.tags.map((tag) => <TagBadge key={tag} tag={tag} small />)}
        </div>
        <p className="text-white font-semibold text-sm truncate">{video.title}</p>
        <div className="flex items-center gap-3 mt-1 text-gray-500 text-xs flex-wrap">
          <span className="flex items-center gap-1">
            <Image src={video.uploaderAvatar} alt={video.uploader} width={14} height={14} className="rounded-full" unoptimized />
            {video.uploader}
          </span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{video.date}</span>
          <span>{video.views.toLocaleString()} views</span>
        </div>
      </div>

      {/* Status */}
      <div className={`flex items-center gap-1 text-xs font-bold flex-shrink-0 ${STATUS_TEXT_CLASS[video.status]}`}>
        <StatusIcon status={video.status} />
        {video.status}
      </div>

      {/* Likes + Comments */}
      <div className="flex items-center gap-4 text-gray-500 text-xs flex-shrink-0">
        <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{video.likes}</span>
        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{video.comments}</span>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0">
        <ApproveRejectButtons id={video.id} onApprove={onApprove} onReject={onReject} />
      </div>
    </div>
  );
}

// ─── FilterPanel ──────────────────────────────────────────────────────────────

function FilterPanel({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClear: () => void;
}) {
  const toggleTag = (tag: string) => {
    const updated = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: updated });
  };

  const activeCount =
    (filters.status !== "ALL" ? 1 : 0) +
    filters.tags.length +
    (filters.uploader ? 1 : 0) +
    (filters.date ? 1 : 0);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Filter className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Status</p>
        <div className="flex flex-wrap gap-2">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, status: s })}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                filters.status === s
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Category / Tags</p>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => {
            const active = filters.tags.includes(tag);
            const cls = TAG_CLASS[tag] ?? "bg-gray-600 text-white";
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                  active ? `${cls} border-transparent` : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Uploader</p>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="e.g. @minhaj"
            value={filters.uploader}
            onChange={(e) => onChange({ ...filters, uploader: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Date</p>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="e.g. 5/6/2026"
            value={filters.date}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VideoModerationPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [filters, setFilters] = useState<FilterState>({
    status: "ALL",
    tags: [],
    uploader: "",
    date: "",
  });

  const clearFilters = () => setFilters({ status: "ALL", tags: [], uploader: "", date: "" });

  const filteredVideos = videos.filter((v) => {
    if (filters.status !== "ALL" && v.status !== filters.status) return false;
    if (filters.tags.length > 0 && !filters.tags.some((t) => v.tags.includes(t))) return false;
    if (filters.uploader && !v.uploader.toLowerCase().includes(filters.uploader.toLowerCase())) return false;
    if (filters.date && !v.date.includes(filters.date)) return false;
    if (search && !v.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleApprove = (id: number) =>
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, status: "APPROVED" as VideoStatus } : v)));

  const handleReject = (id: number) =>
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, status: "REJECTED" as VideoStatus } : v)));

  const activeFilterCount =
    (filters.status !== "ALL" ? 1 : 0) +
    filters.tags.length +
    (filters.uploader ? 1 : 0) +
    (filters.date ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Navbar ── */}
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">Video Moderation</h1>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
            />
          </div>

          <button className="relative w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Bell className="w-4 h-4 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold leading-none">Admin User</p>
              <p className="text-xs text-gray-400 mt-0.5">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="px-6 py-6">

        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-56"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                showFilters || activeFilterCount > 0
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-5">
            <FilterPanel filters={filters} onChange={setFilters} onClear={clearFilters} />
          </div>
        )}

        {/* Active Filter Pills */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.status !== "ALL" && (
              <span className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                Status: {filters.status}
                <button onClick={() => setFilters({ ...filters, status: "ALL" })}><X className="w-3 h-3" /></button>
              </span>
            )}
            {filters.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                {tag}
                <button onClick={() => setFilters({ ...filters, tags: filters.tags.filter((t) => t !== tag) })}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {filters.uploader && (
              <span className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                {filters.uploader}
                <button onClick={() => setFilters({ ...filters, uploader: "" })}><X className="w-3 h-3" /></button>
              </span>
            )}
            {filters.date && (
              <span className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                {filters.date}
                <button onClick={() => setFilters({ ...filters, date: "" })}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Videos */}
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-600">
            <Search className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium">No videos found</p>
            <p className="text-sm mt-1">Try changing your search or filters</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} onApprove={handleApprove} onReject={handleReject} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredVideos.map((video) => (
              <VideoRow key={video.id} video={video} onApprove={handleApprove} onReject={handleReject} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
