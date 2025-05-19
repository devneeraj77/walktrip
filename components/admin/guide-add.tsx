"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GuideAddPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    name: "",
    specialty: "",
    experience: 0,
    avatar: null as File | null,
    bio: "",
    languages: [] as string[],
    hourlyRate: 0,
    rating: 0,
    reviewCount: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (name === "languages") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
      ).map((option) => option.value);

      setFormData((prev) => ({ ...prev, languages: selectedOptions }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, avatar: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let avatarUrl = "";

    if (formData.avatar) {
      // Replace with real upload logic
      avatarUrl = `/uploads/${formData.avatar.name}`;
    } else {
      // Fallback to pravatar
      avatarUrl = `https://i.pravatar.cc/150?u=${formData.name || Math.random()}`;
    }

    const guide = {
      ...formData,
      avatar: avatarUrl,
      availability: {
        Monday: true,
        Tuesday: true,
        Wednesday: false,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: false,
      },
    };

    const res = await fetch("/api/guides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guide),
    });

    if (res.ok) {
      router.push("/guides");
    } else {
      alert("Failed to create guide");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Add New Guide</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Avatar Image</label>
          <input accept="image/*" type="file" onChange={handleFileChange} />
          <p className="text-sm text-gray-500 mt-1">
            If not uploaded, a default avatar will be used.
          </p>
        </div>

        {[
          { name: "title", type: "text" },
          { name: "username", type: "text" },
          { name: "description", type: "textarea" },
          { name: "location", type: "text" },
          { name: "name", type: "text" },
          { name: "specialty", type: "text" },
          { name: "experience", type: "number" },
          { name: "bio", type: "textarea" },
          { name: "hourlyRate", type: "number" },
          { name: "rating", type: "number" },
          { name: "reviewCount", type: "number" },
        ].map(({ name, type }) => (
          <div key={name}>
            <label className="block font-medium capitalize mb-1">{name}</label>
            {type === "textarea" ? (
              <textarea
                className="w-full border px-3 py-2 rounded"
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
              />
            ) : (
              <input
                className="w-full border px-3 py-2 rounded"
                name={name}
                type={type}
                value={formData[name as keyof typeof formData] as any}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <div>
          <label className="block font-medium mb-1">Languages Known</label>
          <select
            multiple
            className="w-full border px-3 py-2 rounded"
            name="languages"
            value={formData.languages}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(
                (option) => option.value,
              );

              setFormData((prev) => ({ ...prev, languages: selected }));
            }}
          >
            {[
              "Afrikaans",
              "Albanian",
              "Amharic",
              "Arabic",
              "Armenian",
              "Assamese",
              "Aymara",
              "Azerbaijani",
              "Bambara",
              "Basque",
              "Belarusian",
              "Bengali",
              "Bhojpuri",
              "Bosnian",
              "Bulgarian",
              "Burmese",
              "Catalan",
              "Cebuano",
              "Chichewa",
              "Chinese (Simplified)",
              "Chinese (Traditional)",
              "Corsican",
              "Croatian",
              "Czech",
              "Danish",
              "Dhivehi",
              "Dogri",
              "Dutch",
              "English",
              "Esperanto",
              "Estonian",
              "Ewe",
              "Filipino",
              "Finnish",
              "French",
              "Frisian",
              "Galician",
              "Georgian",
              "German",
              "Greek",
              "Guarani",
              "Gujarati",
              "Haitian Creole",
              "Hausa",
              "Hawaiian",
              "Hebrew",
              "Hindi",
              "Hmong",
              "Hungarian",
              "Icelandic",
              "Igbo",
              "Ilocano",
              "Indonesian",
              "Irish",
              "Italian",
              "Japanese",
              "Javanese",
              "Kannada",
              "Kazakh",
              "Khmer",
              "Kinyarwanda",
              "Konkani",
              "Korean",
              "Krio",
              "Kurdish (Kurmanji)",
              "Kurdish (Sorani)",
              "Kyrgyz",
              "Lao",
              "Latin",
              "Latvian",
              "Lingala",
              "Lithuanian",
              "Luganda",
              "Luxembourgish",
              "Macedonian",
              "Maithili",
              "Malagasy",
              "Malay",
              "Malayalam",
              "Maltese",
              "Maori",
              "Marathi",
              "Meitei (Manipuri)",
              "Mizo",
              "Mongolian",
              "Nepali",
              "Norwegian",
              "Nyanja",
              "Odia (Oriya)",
              "Oromo",
              "Pashto",
              "Persian",
              "Polish",
              "Portuguese",
              "Punjabi",
              "Quechua",
              "Romanian",
              "Russian",
              "Samoan",
              "Sanskrit",
              "Scots Gaelic",
              "Serbian",
              "Sesotho",
              "Shona",
              "Sindhi",
              "Sinhala",
              "Slovak",
              "Slovenian",
              "Somali",
              "Spanish",
              "Sundanese",
              "Swahili",
              "Swedish",
              "Tajik",
              "Tamil",
              "Tatar",
              "Telugu",
              "Thai",
              "Tigrinya",
              "Tsonga",
              "Turkish",
              "Turkmen",
              "Twi",
              "Ukrainian",
              "Urdu",
              "Uyghur",
              "Uzbek",
              "Vietnamese",
              "Welsh",
              "Xhosa",
              "Yiddish",
              "Yoruba",
              "Zulu",
            ].map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl (or Cmd on Mac) to select multiple languages
          </p>
          {formData.languages.length > 0 && (
            <p className="text-sm text-gray-700 mt-1">
              Selected: {formData.languages.join(", ")}
            </p>
          )}
        </div>

        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          type="submit"
        >
          Submit Guide
        </button>
      </form>
    </div>
  );
}
