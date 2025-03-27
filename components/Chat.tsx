'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];


const exampleChartData = [
  { name: 'Income', value: 50000 },
  { name: 'Deductions', value: 12000 },
  { name: 'Taxable Income', value: 38000 },
];

export default function Chat({ darkMode }: { darkMode: boolean }) {
  const {
    messages,
    append,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
  } = useChat({
    streamProtocol: 'text',
    api: '/api/chat',
  });
  const [files, setFiles] = useState<FileList | null | undefined>(undefined);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [pastedPreviews, setPastedPreviews] = useState<string[]>([]);


  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const suggestions = [
    'How do tax brackets work?',
    'Tell me about deductions',
    'What is the standard deduction?',
  ];

  const queryClient = useQueryClient();


  

  const getFollowUpSuggestions = (answer: string): string[] => {
    
    const lower = answer.toLowerCase();
      
      if (lower.includes('bracket')) {
        return [
          'What are the 2024 federal tax brackets?',
          'How do I move into a lower tax bracket?',
          'Do states have different tax brackets than federal?',
        ];
      }
    
      if (lower.includes('deduction')) {
        return [
          'What is the standard deduction for 2024?',
          'What deductions can I take as a homeowner?',
          'Are charitable donations tax-deductible?',
        ];
      }
      
      if (lower.includes('credit')) {
        return [
          'What tax credits do parents qualify for?',
          'What is the Earned Income Tax Credit (EITC)?',
          'How do I claim the Child Tax Credit?',
        ];
      }
      
      if (lower.includes('income')) {
        return [
          'What types of income are taxable?',
          'Is Social Security income taxable?',
          'How do I report freelance income?',
        ];
      }
      
      if (lower.includes('refund')) {
        return [
          'When will I receive my tax refund?',
          'Why is my refund smaller this year?',
          'How do I track my IRS refund?',
        ];
      }
      
      if (lower.includes('filing')) {
        return [
          'How do I file my taxes for free?',
          'Can I file taxes without a W-2?',
          'Should I file jointly or separately?',
        ];
      }
      
      if (lower.includes('dependents')) {
        return [
          'Who qualifies as a dependent?',
          'How do dependents affect my tax return?',
          'Can I claim my college student as a dependent?',
        ];
      }
      
      if (lower.includes('self-employed')) {
        return [
          'How do I file taxes if I’m self-employed?',
          'What expenses can I deduct as self-employed?',
          'Do I need to pay estimated quarterly taxes?',
        ];
      }
      
      if (lower.includes('w-2')) {
        return [
          'What is a W-2 form used for?',
          'What if I lost my W-2?',
          'When should I expect to receive my W-2?',
        ];
      }
    
      if (lower.includes('1099')) {
        return [
          'What is a 1099-NEC form?',
          'How do I report 1099 income?',
          'What happens if I don’t report my 1099 earnings?',
        ];
      }
      
      if (lower.includes('irs')) {
        return [
          'How do I contact the IRS?',
          'What does it mean if I get an IRS notice?',
          'How do I set up a payment plan with the IRS?',
        ];
      }
    

      // Default fallback suggestions
      return [
        'How do I file my taxes online?',
        'What documents do I need to prepare?',
        'When is the tax deadline?',
      ];
    };
    
    const fakeUpload = async (file: File) => {
      await new Promise((res) => setTimeout(res, 2000)) // simulate upload
      return { success: true, fileName: file.name }
    }
    
    const {
      mutate: uploadFile,
      isLoading: isUploading,
      data: uploadResult,
    } = useMutation({
      mutationFn: fakeUpload,
      onSuccess: (res) => {
        console.log('Upload complete:', res)
      },
    })


    const fetchChatHistory = async () => {
      const res = await fetch('/api/chat-history')
      return res.json()
    }
    
    const { data: chatHistory, isLoading } = useQuery({
      queryKey: ['chat-history'],
      queryFn: fetchChatHistory,
    })
    


  
  // Live webcam

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);
  
      // Wait a tick to ensure videoRef is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 50); // 50ms delay is usually enough
    } catch (err) {
      alert("Could not access the camera.");
      console.error(err);
    }
  };
  
  
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
    setCameraStream(null);
  };



  const capturePhoto = () => {
    if (!videoRef.current) return;
  
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    ctx.drawImage(videoRef.current, 0, 0);
  
    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], `webcam-${Date.now()}.png`, { type: 'image/png' });
  
        // Add to FileList using DataTransfer
        setFiles(prev => {
          const dt = new DataTransfer();
          if (prev) Array.from(prev).forEach(f => dt.items.add(f));
          dt.items.add(file);
          return dt.files;
        });
  
        stopCamera();
      }
    }, 'image/png');
  };
  
  // Paste Image  

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
  
      const newFiles: File[] = [];
      const newPreviews: string[] = [];
  
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            newFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
          }
        }
      }
  
      if (newFiles.length > 0) {
        setFiles(prev => {
          const dt = new DataTransfer();
          if (prev) Array.from(prev).forEach(f => dt.items.add(f));
          newFiles.forEach(f => dt.items.add(f));
          return dt.files;
        });
  
        setPastedPreviews(prev => [...prev, ...newPreviews]);
        setShowSpinner(true);
        setTimeout(() => setShowSpinner(false), 2000);
      }
    };
  
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);
  
  useEffect(() => {
    if (!files) return;
  
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setFilePreviews(urls);
  
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  
  const handleSuggestionClick = async (text: string) => {
    await append({ role: 'user', content: text });
  };

  const handleReset = () => {
    location.reload();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setFileName(file.name);
      setShowSpinner(true);
      setTimeout(() => setShowSpinner(false), 2000);

      uploadFile(file, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['chat-history'] })
        },
      })
    } 
    
    else {
      alert('Only images and PDFs are supported.');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  
  

  function renderChartFromBlock(content: string) {
    const chartRegex = /\[chart\]([\s\S]*?)\[\/chart\]/;
    const match = content.match(chartRegex);
    if (!match) return null;
  
    try {
      const chartConfig = JSON.parse(match[1]);
  
      const chartData = chartConfig.data.map((d: any) => ({
        name: d.label,
        value: d.value,
      }));
  
      switch (chartConfig.type) {
        case 'bar':
          return (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          );
        case 'pie':
          return (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          );
        case 'line':
          return (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          );
        default:
          return null;
      }
    } catch (err) {
      console.error("Failed to parse chart config:", err);
      return null;
    }
  }
  
  
  
  

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

 

  return (
    
    <div
      className={`max-w-3xl mx-auto p-6 shadow rounded-3xl mt-6 transition-colors duration-300 ${
        darkMode ? 'bg-[#222] text-white' : 'bg-white text-black'
      }`}
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image src="/cotax.svg" alt="CoTax Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-3xl font-medium text-center text-[#3061a4]">CoTax AI Chatbot</h1>
          </div>
          <button
            onClick={handleReset}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-3xl hover:bg-red-200 cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Chat History */}
        <div
          ref={scrollRef}
          className={`h-[45vh] overflow-y-auto overflow-x-hidden space-y-3 border border-[#d4d4d8] rounded-3xl p-4 pr-2 custom-scrollbar ${
            darkMode ? 'bg-[#2a2a2a] text-white scrollbar-dark' : 'bg-gray-50 scrollbar-light'
          }`}
        >
          {messages.map((m, i) => {
            const isAssistant = m.role === 'assistant';
            const isLastAssistantMessage = isAssistant && i === messages.length - 1;
            
            const userAskedForChart =
              (messages[i - 1]?.content.toLowerCase() || '').includes('chart') ||
              (messages[i - 1]?.content.toLowerCase() || '').includes('graph');

            const userAskedForTable =
              (messages[i - 1]?.content.toLowerCase() || '').includes('table');


            return (
              <div
                key={i}
                className={`p-4 rounded-3xl w-fit max-w-[80%] whitespace-normal ${
                  m.role === 'user'
                    ? darkMode
                      ? 'bg-[#3d3d3d] text-white self-end ml-auto'
                      : 'bg-blue-100 self-end ml-auto'
                    : darkMode
                    ? 'bg-[#2e2e2e]'
                    : 'bg-gray-100'
                }`}
              >
                {isAssistant && (
                  <div className="flex items-center gap-2 mb-1">
                    <Image src="/cotax_logo.jpg" alt="CoTax Logo" width={24} height={24} className="rounded-full" />
                    <span className="text-sm font-semibold text-gray-500">CoTax AI</span>
                  </div>
                )}
              

                
                <div className="text-[15px] leading-tight [&>*]:my-0">

                  
                  
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className={`${darkMode ? 'text-gray-100' : 'text-black'} mb-4 leading-snug`}>
                          {children}
                        </p>
                      ),
                      
                      strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside m-4">{children}</ul>
                      ),
                      li: ({ children }) => <li className="ml-4 mb-2">{children} </li>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      code: ({ children }) => (
                        <code className="bg-gray-200 text-sm px-1 rounded">{children}</code>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500">
                          {children}
                        </blockquote>
                      ),
                      // Table Stuff
                      table: userAskedForTable ? ({ children }) => (
                        <div className="overflow-x-auto mt-2">
                          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm shadow-md">
                            {children}
                          </table>
                        </div>
                      ) : () => null, // Don't render table
                  
                      thead: ({ children }) => (
                        <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                          {children}
                        </thead>
                      ),
                      tbody: ({ children }) => <tbody>{children}</tbody>,
                      tr: ({ children }) => (
                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                          {children}
                        </tr>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700">
                          {children}
                        </td>
                      ),

                    }}
                  >
                      {m.content.replace(/\[chart\][\s\S]*?\[\/chart\]/, '').replace(/\n{2,}/g, '\n')}

                    
    
                  </ReactMarkdown>
                  
                </div>

                

                {isAssistant && userAskedForChart && renderChartFromBlock(m.content)}

                {isLastAssistantMessage && (
                  <div className="mt-3 space-x-2 flex flex-wrap">
                    {getFollowUpSuggestions(
                      messages
                        .slice(0, i)
                        .reverse()
                        .find((msg) => msg.role === 'user')?.content || ''
                    ).map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => append({ role: 'user', content: q })}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm mt-2 cursor-pointer text-black"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}


                {m?.experimental_attachments?.map((file, index) => {
                  if (file.contentType?.startsWith('image/')) {
                    return (
                      <Image
                        key={`${m.id}-${index}`}
                        src={file.url}
                        alt={file.name || `attachment-${index}`}
                        width={300}
                        height={300}
                        className="mt-2 rounded"
                      />
                    );
                  } else if (file.contentType === 'application/pdf') {
                    return (
                      <a
                        key={`${m.id}-${index}`}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-500 underline block"
                      >
                        📄 {file.name || `PDF File`}
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}

          {status === 'streaming' && (
            <div className="text-sm italic text-gray-400">CoTax is typing...</div>
          )}

          {error && (
            <div className="text-sm text-red-500">Something went wrong. Please try again.</div>
          )}
          {showSpinner && (
            <div className="text-sm text-gray-500">
              Analyzing file <strong>{fileName}</strong>...
            </div>
          )}
        </div>
      {/* Preview uploaded files before sending */}
      {files && (
        <div className="mt-4 space-y-2">
          {Array.from(files).map((file, idx) => {
           const fileURL = filePreviews[idx]; // ✅ use cached URL
           const isImage = file.type.startsWith('image/');
            const isPDF = file.type === 'application/pdf';

            


            return (
              <div key={idx} className="p-2 bg-gray-100 rounded-lg text-sm">
                <p className="font-medium">{file.name}</p>
                {isImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fileURL}
                    alt={file.name}
                    className="rounded-lg mt-2 max-w-xs max-h-60"
                    onLoad={() => URL.revokeObjectURL(fileURL)} // Free memory
                  />
                )}
                {isPDF && (
                  <iframe
                    src={fileURL}
                    title={file.name}
                    className="w-full h-48 mt-2 rounded-lg border"
                    onLoad={() => URL.revokeObjectURL(fileURL)} // Free memory
                  />
                )}
              </div>
            );
          })}
        </div>
      )}




      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, {
            experimental_attachments: files ?? undefined,
          });
          setFiles(undefined);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
        className="mt-4 flex flex-col sm:flex-row gap-2"
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a tax question..."
          rows={1}
          className={`flex-1 border p-4 rounded-3xl resize-none border-[#d4d4d8] custom-scrollbar ${
            darkMode
              ? 'bg-[#2a2a2a] text-white placeholder:text-gray-300 scrollbar-dark'
              : 'text-black scrollbar-light'
          }`}
        />

        <button
          type="submit"
          className="bg-[#3061a4] hover:bg-[#274F85] text-white px-4 py-2 rounded-3xl cursor-pointer flex items-center justify-center"
        >
          <svg
            viewBox="0 0 512 512"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white m-2"
          >
            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
          </svg>
        </button>
      </form>

      {/* Suggestions - these are default placeholders*/}
      {/* <div className="mt-4 space-x-2 flex flex-wrap">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(s)}
            className={`px-4 py-1 rounded-3xl cursor-pointer mt-2 ${
              darkMode
                ? 'bg-[#1b1b1b] text-white border border-[#363636] hover:bg-[#2a2a2a]'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div> */}


      {/* Webcam Capture */}
      <div className="mt-4 flex items-center gap-4 flex-wrap">
        {/* Webcam Button */}
        <button
          onClick={startCamera}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-3xl cursor-pointer transition"
        >
          📷 Open Webcam
        </button>

        {/* File Upload Button */}
        <label
          htmlFor="file-upload"
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-3xl cursor-pointer transition inline-block"
        >
          📁 Upload File
        </label>
        
        <input
          id="file-upload"
          type="file"
          accept="image/*,.pdf"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files) setFiles(e.target.files);
          }}
          multiple
          className="hidden"
        />
      </div>
      

    {/* Show camera preview below buttons */}
          {/* Show camera preview below buttons */}
          {showCamera && (
        <div className="mt-4 space-y-2">
          <video ref={videoRef} className="w-full max-w-md rounded" autoPlay />

          <div className="flex gap-4 mt-2">
            <button
              onClick={capturePhoto}
              className="bg-green-500 text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-green-600"
            >
              Capture
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-500 text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
        
      )}
       <div className="fixed bottom-4 right-4 z-50 px-2 py-2 text-sm text-gray-400 dark:text-white">
      Streamlined client collaboration and tax prep with AI agents
      </div>
    </div>
    
  );
}