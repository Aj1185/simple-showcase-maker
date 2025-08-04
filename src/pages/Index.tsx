import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code2, Palette, Zap, Instagram, MessageCircle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from '@/components/GlassCard';
import LightTrailCursor from '@/components/LightTrailCursor';
import WorkGallery from '@/components/WorkGallery';
import BookOfGlory from '@/components/BookOfGlory';
import NeuralPathways from '@/components/NeuralPathways';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import avatarImage from '@/assets/avatar-3d.png';

const getSkillIcon = (iconName: string) => {
  const iconMap: { [key: string]: string } = {
    'siFigma': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Figma</title><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.02s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49h4.49v4.49zm-1.471 0c0-1.665-1.355-3.019-3.02-3.019S5.225 14.845 5.225 16.51s1.354 3.019 3.019 3.019 3.02-1.354 3.02-3.019zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49S10.624 24 8.148 24zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02 3.019-1.355 3.019-3.02-1.354-3.019-3.019-3.019z"/></svg>',
    'siHtml5': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>HTML5</title><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
    'siGooglecloud': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Google Cloud</title><path d="M12.19 2.38a9.344 9.344 0 0 1 7.234 3.447 6.256 6.256 0 0 1 2.753 4.844 5.162 5.162 0 0 1-1.433 3.662A8.217 8.217 0 0 1 18.85 16.5a7.36 7.36 0 0 1-2.273 1.943 6.298 6.298 0 0 1-2.998.75H6.421a4.89 4.89 0 0 1-3.54-1.473A4.89 4.89 0 0 1 1.41 14.18a4.89 4.89 0 0 1 1.471-3.54A4.89 4.89 0 0 1 6.42 9.17h.375a7.847 7.847 0 0 1 2.27-4.29A7.847 7.847 0 0 1 12.19 2.38z"/></svg>',
    'siNextdotjs': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Next.js</title><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.573 4.889 20.773 1.345 16.76.215a12.6 12.6 0 0 0-2.554-.302c-.405-.018-2.422-.018-2.634.017z"/></svg>',
    'siTypescript': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>TypeScript</title><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>',
    'siGit': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Git</title><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>',
    'siGithub': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    'siNodedotjs': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Node.js</title><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>',
    'siCanva': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Canva</title><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.985 11.988 11.985 6.618 0 11.985-5.367 11.985-11.985C23.002 5.367 17.635.001 12.017.001zM8.232 8.847c0-.39.136-.703.408-.939.408-.408.898-.612 1.469-.612.409 0 .816.136 1.224.408l.204.136V6.616c-.408-.272-.952-.408-1.632-.408-1.836 0-3.401 1.565-3.401 3.401 0 1.632 1.361 3.129 3.197 3.129 1.429 0 2.586-1.157 2.586-2.586 0-.952-.68-1.768-1.564-1.972v-.884c1.36.204 2.448 1.36 2.448 2.788 0 1.904-1.564 3.401-3.401 3.401-2.313 0-4.217-1.904-4.217-4.217zm8.299 4.761c-1.769 0-3.197-1.429-3.197-3.197 0-1.769 1.429-3.197 3.197-3.197 1.769 0 3.197 1.429 3.197 3.197 0 1.769-1.429 3.197-3.197 3.197zm0-.817c1.293 0 2.38-1.089 2.38-2.38 0-1.293-1.089-2.38-2.38-2.38-1.293 0-2.38 1.089-2.38 2.38 0 1.293 1.089 2.38 2.38 2.38z"/></svg>',
    'siFirebase': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Firebase</title><path d="M5.229 4.382l3.821 3.82-.637-3.176c-.043-.215.1-.411.314-.42.059-.002.12.01.176.037l.707.354 1.31-.655c.378-.189.84-.189 1.218 0l6.086 3.043c.378.189.618.58.618 1.007v8.607c0 .427-.24.818-.618 1.007l-6.086 3.043c-.378.189-.84.189-1.218 0l-6.086-3.043C4.24 17.818 4 17.427 4 17v-8.607c0-.427.24-.818.618-1.007l.611-.306zm6.038-.013c.378-.189.84-.189 1.218 0l6.171 3.086-1.31.655-.707-.354c-.056-.027-.117-.039-.176-.037-.214.009-.357.205-.314.42l.637 3.176-3.821-3.82-.707-.354c-.056-.027-.117-.039-.176-.037-.214.009-.357.205-.314.42l.637 3.176-3.821-3.82-.707-.354c-.056-.027-.117-.039-.176-.037-.214.009-.357.205-.314.42l.637 3.176L5.229 4.382l.707-.354c.056-.027.117-.039.176-.037.214.009.357.205.314.42l-.637 3.176z"/></svg>',
    'siMysql': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>MySQL</title><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.151zM18.79 15.71c-.17-.04-.297-.047-.37-.047-.17 0-.37.02-.37.02v.013c.053.107.14.18.214.267.053.107.1.214.154.32l.014-.014c.094-.067.14-.174.14-.334-.04-.047-.047-.094-.08-.14-.04-.067-.127-.1-.18-.154zM12.684 22.39c-2.096.007-4.013-.8-5.22-2.233-.54-.64-.54-1.23-.893-1.87-.353-.64-.893-1.233-1.446-1.87-.553-.64-1.1-1.233-1.1-2.233 0-.8.14-1.5.4-2.1.26-.6.64-1.1 1.1-1.5.46-.4 1-.7 1.6-.9.6-.2 1.2-.3 1.9-.3.7 0 1.3.1 1.9.3.6.2 1.14.5 1.6.9.46.4.84.9 1.1 1.5.26.6.4 1.3.4 2.1 0 1-.547 1.593-1.1 2.233-.553.64-1.093 1.23-1.446 1.87-.353.64-.353 1.23-.893 1.87-1.207 1.433-3.124 2.24-5.22 2.233z"/></svg>',
    'siCplusplus': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>C++</title><path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.109c-3.92 0-7.109-3.189-7.109-7.109S8.08 4.891 12 4.891a7.133 7.133 0 0 1 6.156 3.552l-3.076 1.781A3.567 3.567 0 0 0 12 8.668c-1.956 0-3.555 1.6-3.555 3.555S10.044 15.778 12 15.778a3.567 3.567 0 0 0 3.08-1.556l3.077 1.781A7.135 7.135 0 0 1 12 19.109zm7.109-6.714h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79z"/></svg>',
    'siMicrosoft': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Microsoft</title><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/></svg>',
    'siVercel': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Vercel</title><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>',
    'siReact': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>React</title><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.471 0-.92.015-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.015 1.36-.034-.44.572-.895 1.095-1.36 1.56-.455-.467-.91-.988-1.36-1.56z"/></svg>',
    'siSupabase': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Supabase</title><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12V23.604a.396.396 0 0 0 .716.233L21.797 11.576l.401-.562a1.04 1.04 0 0 0-.836-1.66z"/></svg>'
  };
  return iconMap[iconName] || '';
};

const Index = () => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update current section based on scroll position
      const sections = document.querySelectorAll('.chapter-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techSkills = [
    { name: 'Figma', icon: 'siFigma', color: 'purple' as const },
    { name: 'HTML', icon: 'siHtml5', color: 'blue' as const },
    { name: 'Google Cloud', icon: 'siGooglecloud', color: 'cyan' as const },
    { name: 'Next.js', icon: 'siNextdotjs', color: 'purple' as const },
    { name: 'TypeScript', icon: 'siTypescript', color: 'blue' as const },
    { name: 'Git', icon: 'siGit', color: 'pink' as const },
    { name: 'GitHub', icon: 'siGithub', color: 'cyan' as const },
    { name: 'Node.js', icon: 'siNodedotjs', color: 'purple' as const },
    { name: 'Canva', icon: 'siCanva', color: 'blue' as const },
    { name: 'Firebase', icon: 'siFirebase', color: 'pink' as const },
    { name: 'SQL', icon: 'siMysql', color: 'cyan' as const },
    { name: 'C++', icon: 'siCplusplus', color: 'purple' as const },
    { name: 'MS Office', icon: 'siMicrosoft', color: 'blue' as const },
    { name: 'Vercel', icon: 'siVercel', color: 'pink' as const },
    { name: 'React', icon: 'siReact', color: 'cyan' as const },
    { name: 'Supabase', icon: 'siSupabase', color: 'purple' as const }
  ];

  const projects = [
    {
      title: 'Modern E-commerce Platform',
      description: 'A fully responsive e-commerce platform with advanced filtering and payment integration. Website is still under construction not fully deployed',
      tech: ['React', 'Three.js', 'TensorFlow.js'],
      color: 'purple' as const
    },
    {
      title: 'Brain Buddy',
      description: 'BrainBuddy is an innovative AI-powered learning platform designed specifically for students under 15. It transforms traditional study sessions into gamified learning adventures.',
      tech: ['Vue.js', 'D3.js', 'WebGL'],
      color: 'cyan' as const
    },
    {
      title: 'Cyberpunk CMS',
      description: 'Futuristic content management system with AI-powered content generation.',
      tech: ['Next.js', 'OpenAI', 'Prisma'],
      color: 'pink' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <LightTrailCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-4" intensity="low">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-orbitron font-bold neon-text">
                ./portfolio
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex space-x-6">
                  {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item, index) => (
                    <button
                      key={item}
                      className={cn(
                        'text-sm font-rajdhani font-medium transition-colors duration-300',
                        'text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white',
                        currentSection === index 
                          ? 'text-primary dark:neon-text' 
                          : ''
                      )}
                      onClick={() => {
                        const elementId = item.toLowerCase() === 'projects' ? 'digital-artifacts' : 
                                         item.toLowerCase() === 'certificates' ? 'digital-credentials' : 
                                         item.toLowerCase();
                        const element = document.getElementById(elementId);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                  <Link 
                    to="/resume"
                    className="text-sm font-rajdhani font-medium transition-colors duration-300 text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Resume
                  </Link>
                </div>
                <ThemeToggle variant="icon" size="md" />
              </div>
            </div>
          </GlassCard>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="about" 
        className="chapter-section min-h-screen flex items-center justify-center relative py-20"
        onMouseEnter={() => document.dispatchEvent(new CustomEvent('hero-enter'))}
        onMouseLeave={() => document.dispatchEvent(new CustomEvent('hero-leave'))}
      >
        {/* Animated particle background */}
        <div className="absolute inset-0 particles-bg opacity-40" />
        
        {/* Dynamic light streaks */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 right-0 w-64 h-0.5 bg-gradient-to-l from-transparent via-accent to-transparent opacity-40 animate-pulse delay-2000" />
          <div className="absolute top-2/3 left-1/3 w-48 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-25 animate-pulse delay-3000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <GlassCard className="p-8 lg:p-12 max-w-lg" glowColor="purple" intensity="medium">
                {/* Profile Image */}
                <motion.div 
                  className="flex justify-center lg:justify-start mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative">
                    <img 
                      src={avatarImage} 
                      alt="Atharva Jangale" 
                      className="w-28 h-28 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-lg animate-pulse delay-500" />
                  </div>
                </motion.div>
                
                {/* Headline */}
                <motion.h1 
                  className={cn(
                    'text-3xl lg:text-4xl font-space-grotesk font-bold mb-4 text-center lg:text-left transition-all duration-300',
                    theme === 'dark'
                      ? 'gradient-text'
                      : 'text-slate-800'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ 
                    textShadow: theme === 'dark' ? '0 0 20px rgba(147, 51, 234, 0.3)' : 'none'
                  }}
                >
                  Hi, I'm Atharva Jangale
                </motion.h1>
                
                {/* Tagline */}
                <motion.p 
                  className="text-lg font-inter text-gray-700 dark:text-muted-foreground mb-8 leading-relaxed text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Crafting digital experiences at the edge of technology and design
                </motion.p>
                
                {/* Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link 
                    to="/resume"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-xl text-primary font-rajdhani font-semibold transition-all duration-300 hover:scale-105 group"
                  >
                    <FileText className="w-5 h-5" />
                    <span>📄 View Resume</span>
                  </Link>
                  
                  <button 
                    onClick={() => {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary/20 hover:bg-secondary/30 border border-secondary/40 rounded-xl text-secondary font-rajdhani font-semibold transition-all duration-300 hover:scale-105 group"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>🔗 Let's Connect</span>
                  </button>
                </motion.div>
              </GlassCard>
            </motion.div>

            {/* Right Column - About Me */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="w-full"
            >
              <GlassCard className="p-8 lg:p-12" glowColor="cyan" intensity="low">
                <motion.h2 
                  className={cn(
                    'text-2xl lg:text-3xl font-space-grotesk font-bold mb-6',
                    theme === 'dark' ? 'text-accent neon-text' : 'text-slate-800'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  About Me
                </motion.h2>
                
                <motion.div 
                  className="space-y-4 text-gray-700 dark:text-muted-foreground font-inter leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <p>
                    Engineer by discipline, creative by nature — I build interfaces where code meets art. 
                    Passionate about AI, IoT, and meaningful digital experiences.
                  </p>
                  <p>
                    Every project is an opportunity to push boundaries and create something that doesn't just work, 
                    but inspires and delights users in the digital frontier.
                  </p>
                </motion.div>
              </GlassCard>
            </motion.div>
          </div>
          
          {/* Floating scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-rajdhani text-muted-foreground uppercase tracking-wider">Scroll Down</span>
              <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </motion.div>
        </div>
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </section>

      {/* Neural Pathways Skills Section */}
      <NeuralPathways />

      {/* Work Gallery */}
      <WorkGallery />

      {/* Book of Glory */}
      <BookOfGlory />

      {/* Contact Section */}
      <section id="contact" className="chapter-section min-h-screen py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={cn(
            'text-5xl md:text-6xl font-orbitron font-bold mb-6',
            theme === 'dark' ? 'neon-text' : 'text-indigo-900'
          )}>
            ESTABLISH CONNECTION
          </h2>
          <p className="text-xl font-rajdhani text-gray-700 dark:text-muted-foreground mb-16 max-w-2xl mx-auto">
            Ready to build the future together? Let's create something 
            extraordinary that pushes the boundaries of what's possible.
          </p>

          <GlassCard glowColor="purple" className="p-12" intensity="high">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {/* Email - Replace with your email link */}
              <a 
                href="mailto:Atharvajangale778@gmail.com" 
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/40 transition-colors">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">Email</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">Atharvajangale778@gmail.com</p>
              </a>
              
              {/* LinkedIn - Replace with your LinkedIn profile URL */}
              <a 
                href="https://linkedin.com/in/atharva-jangale" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/40 transition-colors">
                  <Linkedin className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">LinkedIn</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">atharva-jangale</p>
              </a>
              
              {/* GitHub - Replace with your GitHub profile URL */}
              <a 
                href="https://github.com/aj1185" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/40 transition-colors">
                  <Github className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">GitHub</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">aj1185</p>
              </a>

              {/* Instagram - Replace with your Instagram profile URL */}
              <a 
                href="https://instagram.com/aj__1185" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/40 transition-colors">
                  <Instagram className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">Instagram</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">aj__1185</p>
              </a>

              {/* Discord - Replace with your Discord invite/profile URL */}
              <a 
                href="https://discord.com/users/772346396119924769" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/40 transition-colors">
                  <MessageCircle className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">Discord</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">aj1185</p>
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-rajdhani text-gray-600 dark:text-muted-foreground">
            © 2025 Atharva Jangale. Crafted in the neon-lit depths of the digital frontier.
          </p>
        </div>
      </footer>

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </div>
  );
};

export default Index;