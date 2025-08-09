import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
    'bot-field'?: string;
}

const ContactPage: React.FC = () => {
    const [submissionStatus, setSubmissionStatus] = React.useState<'success' | 'error' | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset
    } = useForm<IFormInput>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setSubmissionStatus(null);
        const formData = new FormData();
        formData.append('form-name', 'contact');
        
        Object.keys(data).forEach(key => {
            formData.append(key, (data as any)[key]);
        });

        try {
            const response = await fetch("/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setSubmissionStatus('success');
                reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="fade-in bg-slate-50 dark:bg-slate-950/50 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Get In Touch</h1>
                    <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">We'd love to hear from you. Whether you're a company looking to hire or a professional seeking your next role.</p>
                </header>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-xl">
                        <form
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                            noValidate
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <p className="hidden">
                                <label>
                                    Don’t fill this out if you’re human: <input name="bot-field" {...register('bot-field')} />
                                </label>
                            </p>

                            {submissionStatus === 'success' && (
                                <div className="status-banner success fade-in" role="alert">
                                    <span>Thank you! Your message has been sent.</span>
                                    <button type="button" onClick={() => setSubmissionStatus(null)} aria-label="Close">&times;</button>
                                </div>
                            )}
                            {submissionStatus === 'error' && (
                                <div className="status-banner error fade-in" role="alert">
                                    <span>Sorry, something went wrong. Please try again.</span>
                                    <button type="button" onClick={() => setSubmissionStatus(null)} aria-label="Close">&times;</button>
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    {...register('name', { required: 'Full Name is required.' })}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800"
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                                {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    {...register('email', { 
                                        required: 'Email Address is required.',
                                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address."} 
                                    })}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800"
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject"
                                     {...register('subject', { required: 'Subject is required.' })}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800"
                                    aria-invalid={errors.subject ? "true" : "false"}
                                />
                                 {errors.subject && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.subject.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={4}
                                    {...register('message', { required: 'Message is required.' })}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800"
                                    aria-invalid={errors.message ? "true" : "false"}
                                ></textarea>
                                {errors.message && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.message.message}</p>}
                            </div>
                            <div>
                                <button type="submit" disabled={!isValid || isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 dark:disabled:bg-primary-800 disabled:cursor-not-allowed transition-colors">
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Email Us</h3>
                            <a href="mailto:prohireemployment@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">prohireemployment@gmail.com</a>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Call Us</h3>
                            <a href="tel:+1-289-499-9955" className="text-primary-600 dark:text-primary-400 hover:underline">(289) 499-9955</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
