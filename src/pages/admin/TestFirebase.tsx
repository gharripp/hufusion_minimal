import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function TestFirebase() {
  const [status, setStatus] = useState<string[]>([]);
  const [testImage, setTestImage] = useState<File | null>(null);

  const addStatus = (message: string) => {
    console.log(message);
    setStatus(prev => [...prev, message]);
  };

  const testAuth = () => {
    addStatus('--- Testing Authentication ---');
    addStatus(`Current user: ${auth.currentUser?.email || 'Not logged in'}`);
    addStatus(`User ID: ${auth.currentUser?.uid || 'None'}`);
  };

  const testFirestore = async () => {
    addStatus('--- Testing Firestore ---');
    try {
      // Test write with Timestamp like the real code
      const { Timestamp } = await import('firebase/firestore');
      addStatus('Creating document...');

      const docRef = await addDoc(collection(db, 'news'), {
        title: 'Test Article',
        excerpt: 'Test',
        content: 'Test content',
        author: 'Test',
        category: 'research',
        image: '',
        date: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      addStatus(`✅ Firestore write successful! Doc ID: ${docRef.id}`);

      // Test read with orderBy like the real code
      addStatus('Testing read with orderBy...');
      const { query, orderBy, getDocs } = await import('firebase/firestore');
      const newsQuery = query(
        collection(db, 'news'),
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(newsQuery);
      addStatus(`✅ Firestore read successful! Found ${snapshot.size} documents`);

      return docRef.id;
    } catch (error: any) {
      addStatus(`❌ Firestore error: ${error.message}`);
      addStatus(`Error code: ${error.code}`);
      if (error.message?.includes('index')) {
        addStatus('⚠️ You may need to create an index. Check the error link above.');
      }
      return null;
    }
  };

  const testStorage = async () => {
    if (!testImage) {
      addStatus('❌ Please select an image first');
      return;
    }

    addStatus('--- Testing Storage ---');
    addStatus(`Image: ${testImage.name} (${testImage.size} bytes, ${testImage.type})`);

    try {
      const testId = Date.now().toString();
      const fileName = `news/test_${testId}.jpg`;
      const storageRef = ref(storage, fileName);

      addStatus(`Uploading to: ${fileName}`);
      const uploadResult = await uploadBytes(storageRef, testImage);
      addStatus(`✅ Upload successful!`);

      const downloadUrl = await getDownloadURL(storageRef);
      addStatus(`✅ Download URL: ${downloadUrl}`);
    } catch (error: any) {
      addStatus(`❌ Storage error: ${error.message}`);
      addStatus(`Error code: ${error.code}`);
      addStatus(`Full error: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number, name: string): Promise<T> => {
    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${name} timed out after ${timeoutMs}ms`)), timeoutMs)
    );
    return Promise.race([promise, timeout]);
  };

  const testAll = async () => {
    setStatus([]);
    testAuth();

    try {
      addStatus('Starting Firestore test (10s timeout)...');
      const docId = await withTimeout(testFirestore(), 10000, 'Firestore test');

      if (testImage && docId) {
        addStatus('Starting Storage test (15s timeout)...');
        await withTimeout(testStorage(), 15000, 'Storage test');
      }
    } catch (error: any) {
      addStatus(`❌ Test failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Firebase Diagnostics</h1>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Test Controls</h2>

          <div className="mb-4">
            <label className="block mb-2">Select Test Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setTestImage(e.target.files?.[0] || null)}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={testAuth}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Test Auth
            </button>
            <button
              onClick={async () => {
                setStatus([]);
                await testFirestore();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Test Firestore (No Timeout)
            </button>
            <button
              onClick={testStorage}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!testImage}
            >
              Test Storage
            </button>
            <button
              onClick={testAll}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Test All (With Timeout)
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Results:</h2>
          <div className="bg-black p-4 rounded font-mono text-sm space-y-1">
            {status.length === 0 ? (
              <div className="text-gray-500">No tests run yet. Click a button above.</div>
            ) : (
              status.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.includes('✅')
                      ? 'text-green-400'
                      : msg.includes('❌')
                      ? 'text-red-400'
                      : msg.includes('---')
                      ? 'text-yellow-400 font-bold mt-2'
                      : 'text-gray-300'
                  }
                >
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
