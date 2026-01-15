import { useState } from 'react'
import { Accordion, AccordionItem } from '../../../shared/ui/accordion'
import './accordion-widget.css'

const faqData = [
  {
    question: 'Что такое Feature-Sliced Design?',
    answer: 'Feature-Sliced Design (FSD) — это архитектурная методология для frontend-проектов, которая помогает организовать код по слоям и слайсам. Она обеспечивает предсказуемую структуру проекта, упрощает масштабирование и поддержку, а также способствует переиспользованию кода. Основные слои: app, processes, pages, widgets, features, entities, shared.'
  },
  {
    question: 'Как работает accessibility в веб-приложениях?',
    answer: 'Accessibility (a11y) — это практика разработки веб-приложений, доступных для всех пользователей, включая людей с ограниченными возможностями. Это включает поддержку скринридеров, клавиатурную навигацию, достаточный цветовой контраст, семантическую разметку и ARIA-атрибуты. Следование стандартам WCAG обеспечивает равный доступ к информации для всех пользователей.'
  },
  {
    question: 'Почему важна клавиатурная навигация?',
    answer: 'Клавиатурная навигация критически важна для пользователей, которые не могут использовать мышь — это могут быть люди с нарушениями моторики, слепые пользователи со скринридерами, или просто разработчики, предпочитающие работу с клавиатуры. Каждый интерактивный элемент должен быть доступен через Tab, Enter, Space и стрелки. Это требование WCAG Success Criterion 2.1.1.'
  },
  {
    question: 'Что такое ARIA-атрибуты?',
    answer: 'ARIA (Accessible Rich Internet Applications) — это набор атрибутов, которые определяют способы сделать веб-контент более доступным для людей с ограниченными возможностями. ARIA-атрибуты предоставляют дополнительную семантическую информацию для assistive technologies: роли элементов (role), состояния (aria-expanded, aria-checked), свойства (aria-label, aria-describedby) и отношения между элементами (aria-controls, aria-owns).'
  },
  {
    question: 'Как тестировать доступность приложений?',
    answer: 'Тестирование accessibility включает несколько подходов: автоматическое тестирование с помощью инструментов (axe DevTools, WAVE, Lighthouse), ручное тестирование клавиатурной навигации, проверка с помощью скринридеров (NVDA, JAWS, VoiceOver), проверка цветового контраста, и самое важное — тестирование с реальными пользователями с ограниченными возможностями. Комплексный подход обеспечивает соответствие WCAG 2.1/2.2 Level AAA.'
  },
  {
    question: 'В чём разница между WCAG A, AA и AAA?',
    answer: 'WCAG (Web Content Accessibility Guidelines) определяет три уровня соответствия: Level A — минимальный базовый уровень доступности; Level AA — средний уровень, рекомендуемый для большинства сайтов и требуемый многими законами (например, Section 508); Level AAA — наивысший уровень доступности, обеспечивающий максимальную доступность контента. Каждый уровень включает критерии предыдущих плюс дополнительные требования.'
  },
  {
    question: 'Что такое семантическая HTML-разметка?',
    answer: 'Семантическая разметка — это использование HTML-элементов по их прямому назначению для передачи смысла и структуры контента. Например, использование <button> для кнопок, <nav> для навигации, <article> для статей, <h1>-<h6> для заголовков в правильной иерархии. Семантика помогает скринридерам понять структуру страницы, улучшает SEO и делает код более читаемым и поддерживаемым. Это основа accessibility согласно WCAG SC 1.3.1.'
  }
]

export function AccordionWidget() {
  const [mode, setMode] = useState<'single' | 'multiple'>('single')

  return (
    <div className="accordion-widget">
      <div className="accordion-widget-header">
        <h2 className="accordion-widget-title">Вопросы и ответы по Accessibility</h2>
        <div className="accordion-widget-controls">
          <label htmlFor="accordion-mode-switch" className="mode-switch-label">
            Режим:
          </label>
          <div className="mode-switch-group" role="group" aria-labelledby="accordion-mode-label">
            <span id="accordion-mode-label" className="visually-hidden">
              Выберите режим работы аккордеона
            </span>
            <button
              id="accordion-mode-switch"
              type="button"
              className={`mode-switch-button ${mode === 'single' ? 'active' : ''}`}
              onClick={() => setMode('single')}
              aria-pressed={mode === 'single'}
            >
              Одна панель
            </button>
            <button
              type="button"
              className={`mode-switch-button ${mode === 'multiple' ? 'active' : ''}`}
              onClick={() => setMode('multiple')}
              aria-pressed={mode === 'multiple'}
            >
              Множественные
            </button>
          </div>
        </div>
      </div>

      <p className="accordion-widget-description">
        {mode === 'single' 
          ? 'Классический аккордеон: открытие новой панели автоматически закрывает предыдущую.'
          : 'Режим множественных панелей: несколько панелей могут быть открыты одновременно.'
        }
      </p>

      <Accordion mode={mode} defaultOpenIndexes={[0]} key={mode}>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} title={faq.question} index={index}>
            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>

      <div className="accordion-widget-footer">
        <p className="keyboard-hint">
          <strong>Клавиатурная навигация:</strong> Tab для перемещения между панелями, 
          Enter/Space для открытия/закрытия, стрелки ↑↓ для быстрой навигации, 
          Home/End для перехода к первой/последней панели.
        </p>
      </div>
    </div>
  )
}
