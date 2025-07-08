import React, { useState } from 'react';

export default function ClickRevealImage() {
  const [clickCount, setClickCount] = useState(0);
    const [showImage, setShowImage] = useState(false);

      const handleClick = () => {
          const newCount = clickCount + 1;
              setClickCount(newCount);
                  
                      if (newCount === 5) {
                            setShowImage(true);
                                }
                                  };

                                    return (
                                        <div className="w-full h-screen bg-white relative">
                                              {/* Ana sayfa - tamamen boş beyaz sayfa */}
                                                    <div 
                                                            className="w-full h-full cursor-pointer"
                                                                    onClick={handleClick}
                                                                          >
                                                                                </div>

                                                                                      {/* Tam ekran resim - ekranda kalıcı */}
                                                                                            {showImage && (
                                                                                                    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                                                                                                              <img 
                                                                                                                          src="https://i.hizliresim.com/5rpa78t.jpg"
                                                                                                                                      alt="Arşiv resim"
                                                                                                                                                  className="w-screen h-screen object-cover transform rotate-90"
                                                                                                                                                            />
                                                                                                                                                                    </div>
                                                                                                                                                                          )}
                                                                                                                                                                              </div>
                                                                                                                                                                                );
                                       ə                                                                                                                                        }
