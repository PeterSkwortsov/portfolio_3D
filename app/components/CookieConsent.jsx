// components/CookieConsent.jsx
"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже дано согласие
    const consentGiven = getCookie("cookie-consent");
    if (!consentGiven) {
      // Показываем баннер с задержкой
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Функция для получения cookie
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  };

  // Функция для установки cookie
  const setCookie = (name, value, days) => {
    if (typeof document === "undefined") return;

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  };

  const acceptCookies = () => {
    setCookie("cookie-consent", "accepted", 365);
    setIsVisible(false);
  };

  const declineCookies = () => {
    setCookie("cookie-consent", "declined", 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="card bg-base-100 shadow-2xl border-2 border-primary/20 max-w-4xl mx-auto">
        <div className="card-body p-5">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Иконка и текст */}
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🍪</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="card-title text-lg mb-2">
                  Мы используем cookies
                </h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  Мы используем файлы cookie для улучшения работы сайта,
                  персонализации контента и анализа трафика.
                </p>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={declineCookies}
                className="btn btn-outline btn-sm lg:btn-md whitespace-nowrap rounded-xl"
              >
                Отклонить
              </button>
              <button
                onClick={acceptCookies}
                className="btn btn-primary btn-sm lg:btn-md whitespace-nowrap rounded-xl"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
