import React, { useState, useEffect } from "react";
import { ArrowRight, Search, Plus, X, Upload, CheckCircle, Share2, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "../../lib/supabase";
import Section from "../../components/Section";
import Heading from "../../components/Heading";
import NewsLetter from "../../components/newsletter";

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [activeArticle, setActiveArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Disaster",
    tags: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("news_articles")
        .select("*")
        .eq("status", "published")
        .eq("category", "Disaster")
        .order("created_at", { ascending: false });
      if (data) {
        setArticles(data);
        const idFromUrl = searchParams.get("article");
        if (idFromUrl) {
          const linked = data.find((a) => a.id === idFromUrl);
          if (linked) setActiveArticle(linked);
        }
      }
      setLoading(false);
    };
    fetchArticles();
  }, [searchParams]);

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags && a.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
  );

  const openArticle = (article) => {
    setActiveArticle(article);
    setSearchParams({ article: article.id });
  };

  const closeArticle = () => {
    setActiveArticle(null);
    setSearchParams({});
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = null;
    if (formData.image) {
      const fileExt = formData.image.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("news_images")
        .upload(`public/${fileName}`, formData.image);
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("news_images")
          .getPublicUrl(`public/${fileName}`);
        imageUrl = publicUrlData.publicUrl;
      }
    }
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    const { error } = await supabase.from("news_articles").insert([
      {
        title: formData.title,
        content: `<p>${formData.content.replace(/\n/g, "<br/>")}</p>`,
        category: "Disaster",
        tags: tagsArray,
        image_url: imageUrl,
        status: "pending",
      },
    ]);
    setIsSubmitting(false);
    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
        setFormData({ title: "", category: "Disaster", tags: "", content: "", image: null });
      }, 3000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <div className="bg-surface-subtle border-b border-gray-200">
        <div className="container py-14">
          <Heading
            title="WDC Intelligence"
            tag="Global Disaster Updates"
            className="mb-8"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center bg-white px-5 py-3 rounded border border-gray-300 focus-within:border-primary transition-all w-full shadow-sm">
              <Search size={18} className="text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search disaster reports..."
                className="bg-transparent border-none outline-none text-base text-content-primary w-full"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus size={18} /> Submit Intel
            </button>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <Section>
        <div className="container">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="bg-white rounded border border-gray-200 border-t-4 border-t-primary hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  {article.image_url && (
                    <div className="overflow-hidden h-44">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-primary-muted text-primary rounded mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-base font-bold text-content-primary group-hover:text-primary transition-colors flex-1">
                      {article.title}
                    </h3>
                    <div
                      className="text-sm text-content-secondary mt-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
                    />
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                      {new Date(article.created_at).toLocaleDateString()}
                      <ArrowRight
                        size={16}
                        className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Article reading modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={closeArticle}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border-t-4 border-t-primary shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeArticle}
              className="absolute top-4 right-4 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-all z-10"
            >
              <X size={18} />
            </button>
            {activeArticle.image_url && (
              <img src={activeArticle.image_url} className="w-full h-[35vh] object-cover" alt={activeArticle.title} />
            )}
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-primary text-white rounded">
                  {activeArticle.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-content-primary mb-6 leading-tight">
                {activeArticle.title}
              </h2>
              <div
                className="text-base text-content-secondary leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeArticle.content) }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submission modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-2xl border-t-4 border-t-primary p-8 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-content-primary transition-colors"
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold text-content-primary mb-1">Submit Disaster Intel</h2>
            <p className="text-sm text-content-secondary mb-6">
              This intelligence will be categorized under{" "}
              <strong className="text-primary">Disaster</strong>.
            </p>

            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-content-primary">Intel Submitted!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Article Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-content-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Tags (e.g. Earthquakes, Flood, AI)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-content-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <div className="border-2 border-dashed border-gray-300 rounded p-5 flex flex-col items-center bg-surface-subtle hover:border-primary transition-colors relative cursor-pointer">
                  <Upload size={22} className="text-gray-400 mb-1" />
                  <span className="text-sm text-gray-500">
                    {formData.image ? formData.image.name : "Upload cover image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <textarea
                  required
                  rows="5"
                  placeholder="Report content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-content-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Uploading Intel…" : "Submit Report"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Section>
        <div className="container">
          <NewsLetter />
        </div>
      </Section>
    </div>
  );
};

export default News;
