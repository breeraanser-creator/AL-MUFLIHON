import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update Title
    const baseTitle = 'AL-MUFLIHON | Wear • Believe • Succeed';
    document.title = title ? `${title} | AL-MUFLIHON` : baseTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      description ||
      'AL-MUFLIHON (المفلحون) - High-end modest luxury fashion, bespoke Saudi thobes, handcrafted shawls, opulent abayas, and festive collections.';

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      keywords ||
      'AL-MUFLIHON, Almuflihun, modest clothing, luxury thobe, abayas, islamic fashion, designer wear, premium kurta';
  }, [title, description, keywords]);

  return null;
};

export default SEO;
