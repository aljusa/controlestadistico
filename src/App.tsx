import { useState } from 'react'

import Lesson1 from './components/Lesson1'
import Lesson2 from './components/Lesson2'
import Lesson3 from './components/Lesson3'
import Lesson4 from './components/Lesson4'
import Lesson5 from './components/Lesson5'
import Lesson6 from './components/Lesson6'
import Lesson7 from './components/Lesson7'
import Lesson8 from './components/Lesson8'
import Lesson9 from './components/Lesson9'
import Lesson10 from './components/Lesson10'
import Lesson11 from './components/Lesson11'
import Lesson12 from './components/Lesson12'
import Lesson13 from './components/Lesson13'
import Lesson14 from './components/Lesson14'
import Lesson15 from './components/Lesson15'
import Lesson16 from './components/Lesson16'
import Lesson17 from './components/Lesson17'
import Lesson18 from './components/Lesson18'
import Lesson19 from './components/Lesson19'
import Lesson20 from './components/Lesson20'
import Lesson21 from './components/Lesson21'
import Lesson22 from './components/Lesson22'
import Lesson23 from './components/Lesson23'
import Lesson24 from './components/Lesson24'
import Lesson25 from './components/Lesson25'
import Lesson26 from './components/Lesson26'
import Lesson27 from './components/Lesson27'
import Lesson28 from './components/Lesson28'
import Lesson29 from './components/Lesson29'
import Lesson30 from './components/Lesson30'
import Lesson31 from './components/Lesson31'
import Lesson32 from './components/Lesson32'
import Lesson33 from './components/Lesson33'
import Lesson34 from './components/Lesson34'
import Lesson35 from './components/Lesson35'
import Lesson36 from './components/Lesson36'
import Lesson37 from './components/Lesson37'
import Lesson38 from './components/Lesson38'
import Lesson39 from './components/Lesson39'
import Lesson40 from './components/Lesson40'
import Lesson41 from './components/Lesson41'
import Lesson42 from './components/Lesson42'
import Lesson43 from './components/Lesson43'

const lessons = {
  lesson1: Lesson1,
  lesson2: Lesson2,
  lesson3: Lesson3,
  lesson4: Lesson4,
  lesson5: Lesson5,
  lesson6: Lesson6,
  lesson7: Lesson7,
    lesson8: Lesson8,
  lesson9: Lesson9,
  lesson10: Lesson10,
  lesson11: Lesson11,
  lesson12: Lesson12,
  lesson13: Lesson13,
  lesson14: Lesson14,
  lesson15: Lesson15,
  lesson16: Lesson16,
  lesson17: Lesson17,  
  lesson18: Lesson18,  
  lesson19: Lesson19,  
  lesson20: Lesson20,  
  lesson21: Lesson21,
  lesson22: Lesson22,
  lesson23: Lesson23,
  lesson24: Lesson24,
  lesson25: Lesson25,
  lesson26: Lesson26,
  lesson27: Lesson27,
  lesson28: Lesson28,
  lesson29: Lesson29,
  lesson30: Lesson30,
  lesson31: Lesson31,
  lesson32: Lesson32,
  lesson33: Lesson33,
  lesson34: Lesson34,
  lesson35: Lesson35,
  lesson36: Lesson36,
  lesson37: Lesson37,
  lesson38: Lesson38,
  lesson39: Lesson39,
  lesson40: Lesson40,
  lesson41: Lesson41,
  lesson42: Lesson42,
  lesson43: Lesson43,
} as const

type LessonKey = keyof typeof lessons

function App() {
  const [lesson, setLesson] = useState<LessonKey>('lesson1')

  const renderLesson = () => {
    const LessonComponent = lessons[lesson]
    return <LessonComponent />
  }

  return (
    <div>
      <select
        value={lesson}
        onChange={(e) => setLesson(e.target.value as LessonKey)}
      >
        {Array.from({ length: 43 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={`lesson${n}`}>
            Lección {n}
          </option>
        ))}
      </select>

      <hr />

      {renderLesson()}
    </div>
  )
}

export default App
