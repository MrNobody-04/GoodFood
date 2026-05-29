import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsTab({ settings, onUpdateSetting, addToast }) {
  const [whatsappVal, setWhatsappVal] = useState(settings.whatsapp_number || '');
  const [supportVal, setSupportVal] = useState(settings.support_number || '');
  const [deliveryVal, setDeliveryVal] = useState(settings.delivery_available === 'true');
  const [newPasswordVal, setNewPasswordVal] = useState('');

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    
    // Save WhatsApp
    await onUpdateSetting('whatsapp_number', whatsappVal);
    // Save Support WhatsApp
    await onUpdateSetting('support_number', supportVal);
    // Save Delivery Availability
    await onUpdateSetting('delivery_available', String(deliveryVal));
    
    // Save Password if entered
    if (newPasswordVal.trim() !== '') {
      await onUpdateSetting('admin_password', newPasswordVal);
      setNewPasswordVal('');
      addToast('Settings & password updated!', 'success');
    } else {
      addToast('Settings updated successfully!', 'success');
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 space-y-6 shadow-sm">
      <div>
        <h3 className="font-display font-extrabold text-xl text-neutral-900 dark:text-white">Order Routing Settings</h3>
        <p className="text-xs text-neutral-400 mt-1 leading-normal">
          Update phone targets and delivery timings. Changes are saved instantly to your live website database.
        </p>
      </div>

      <form onSubmit={handleUpdateSettings} className="space-y-5">
        {/* WhatsApp Target */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">WhatsApp Number (For Orders & Call Kitchen)</label>
          <input
            type="text"
            value={whatsappVal}
            onChange={(e) => setWhatsappVal(e.target.value)}
            placeholder="+9779811117891"
            className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 font-semibold"
          />
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 leading-relaxed">
            Target number for "Add to Tray" checkout orders and calling. Include country code (e.g. `+977` for Nepal).
          </p>
        </div>

        {/* Support WhatsApp Target */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">WhatsApp Number (For Chat Support)</label>
          <input
            type="text"
            value={supportVal}
            onChange={(e) => setSupportVal(e.target.value)}
            placeholder="+9779814562984"
            className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 font-semibold"
          />
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 leading-relaxed">
            Target number for floating chat support. Include country code (e.g. `+977` for Nepal).
          </p>
        </div>

        {/* Delivery banner switch */}
        <div className="flex items-center justify-between border-t border-b border-neutral-100 dark:border-neutral-800 py-4.5">
          <div>
            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">24/7 Delivery Availability Banner</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 max-w-sm">
              Toggle this switch to let customers know if home delivery is online or closed.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => setDeliveryVal(!deliveryVal)}
            className={`relative inline-flex h-6.5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              deliveryVal ? 'bg-green-500' : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          >
            <span className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              deliveryVal ? 'translate-x-4.5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Change password */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Change Admin Password</label>
          <input
            type="password"
            value={newPasswordVal}
            onChange={(e) => setNewPasswordVal(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 font-semibold"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center space-x-2 bg-brand hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-xs"
        >
          <Save size={16} />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  );
}
